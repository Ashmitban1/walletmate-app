FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install git (required for pip if installing from GitHub)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Install requirements
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source code
COPY . /app

# Run FastAPI on port 5000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000"]
