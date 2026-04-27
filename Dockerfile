FROM python:3.9-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask app (includes embedded React component)
COPY app.py .

# Expose port for Hugging Face
EXPOSE 7860

# Set environment
ENV PORT=7860

# Run the app
CMD ["python", "app.py"]
