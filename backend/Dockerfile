# -------- BUILD STAGE --------
FROM python:3.11-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y gcc libpq-dev

# Copy requirements from root
COPY requirements.txt .

RUN pip install --user --no-cache-dir -r requirements.txt


# -------- FINAL STAGE --------
FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /root/.local /root/.local

ENV PATH=/root/.local/bin:$PATH

# Copy full project (from root context)
COPY . .

RUN python manage.py collectstatic --noinput || true

CMD ["gunicorn", "blog.wsgi:application", "--bind", "0.0.0.0:8000"]