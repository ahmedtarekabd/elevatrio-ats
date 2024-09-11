# Base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy frontend requirements.txt
COPY requirements.txt .

# Install frontend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose Streamlit default port
EXPOSE 8501

# Run the Streamlit app
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
