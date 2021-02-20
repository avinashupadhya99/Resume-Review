FROM python:3.7-slim

WORKDIR resume-review

EXPOSE 5000

RUN apt update && \
    apt install build-essential -y

RUN apt-get update && \
    apt-get install libpq-dev -y

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]