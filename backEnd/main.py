from fastapi import FastAPI

from db.database import engine, Base
from routers import users
 
app = FastAPI()

app.include_router(users.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}

