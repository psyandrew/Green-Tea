# Use official Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt && pip list

# Copy project files
COPY . /app/

# Run app with gunicorn (gtbackend must match your Django project folder)
CMD ["gunicorn", "djangobackend.wsgi:application", "--bind", "0.0.0.0:8000"]

