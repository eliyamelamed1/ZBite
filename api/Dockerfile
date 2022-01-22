FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /api

# Install dependencies
COPY Pipfile Pipfile.lock /api/
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --system

# Copy project
COPY . /api/