from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Check API Key
if not GEMINI_API_KEY:
    raise ValueError("Missing GEMINI_API_KEY in .env")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

# CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    text: str

@app.post("/generate-ai-summary")
async def generate_summary(prompt: Prompt):
    try:
        model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

        # Custom prompt
        custom_prompt = f"""
        These are the receipt entries: {prompt.text}

        Please summarize this with:
        - Total amount spent
        - Average receipt value
        - Most expensive item (with store name)
        - Least expensive item (with store name)

        Keep the tone brief and analytical.
        """

        response = model.generate_content(
            custom_prompt,
            generation_config={
                "temperature": 0.7,
                "max_output_tokens": 256,
            }
        )

        return {"summary": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
