# ---------- STAGE 1: BUILD ----------
FROM python:3.11-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y gcc libpq-dev

# Copy requirements
COPY backend/requirements.txt .

# Install dependencies in user space
RUN pip install --user --no-cache-dir -r requirements.txt


# ---------- STAGE 2: FINAL ----------
FROM python:3.11-slim

WORKDIR /app

# Copy only installed packages
COPY --from=builder /root/.local /root/.local

# Set PATH
ENV PATH=/root/.local/bin:$PATH

# Copy project code
COPY . .

# Optional: collect static
RUN python manage.py collectstatic --noinput || true

# Run app
CMD ["sh", "-c", "cd backend && gunicorn django_project.wsgi:application --bind 0.0.0.0:8000"]