FROM python:3

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt && pip install uvicorn

COPY . /app

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80"]