# Base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy ML models requirements.txt
COPY ml_models/requirements.txt .

# Install ML models dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy ML models code
COPY ml_models/ /app/

# Run model training or inference script
CMD ["python", "models/train.py"]  # Or another entry point for ML models
