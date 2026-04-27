# 🏥 Medical Symptom Checker App - Deployment Guide

## Overview
This is a complete medical symptom prediction app with interactive questionnaire, symptom analysis, and disease prediction. Built with React for frontend and can be deployed on Hugging Face Spaces.

## Project Structure
```
medical-symptom-checker/
├── medical-diagnosis-app.jsx  # Main React component
├── main.jsx                    # React entry point
├── index.html                  # HTML template
├── app.py                      # Flask backend
├── vite.config.js             # Vite configuration
├── package.json               # Node dependencies
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## Features

### ✨ App Features
- **Interactive Questionnaire**: 18+ symptom-related questions
- **Smart Follow-ups**: Additional details based on initial answers
- **Disease Detection**: Analyzes symptoms against 6 common diseases
- **Confidence Score**: Shows match percentage for predicted condition
- **Treatment Info**: Provides recommended treatment approaches
- **Medical Warnings**: Important safety information for each condition
- **Beautiful UI**: Modern gradient design with smooth transitions
- **Responsive Design**: Works on desktop and mobile

### 🎯 Supported Diseases
1. Common Cold
2. Dengue Fever
3. Migraine
4. Gastroenteritis (Stomach Flu)
5. Arthritis
6. Influenza (Flu)

## Local Development

### Prerequisites
- Node.js (v16+)
- Python 3.8+
- npm

### Installation Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd medical-symptom-checker
```

2. **Install Node dependencies**
```bash
npm install
```

3. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

4. **Build React app**
```bash
npm run build
```

5. **Run Flask server**
```bash
python app.py
```

The app will be available at `http://localhost:7860`

## Deployment on Hugging Face Spaces

### Step 1: Create Hugging Face Space
1. Go to https://huggingface.co/spaces
2. Click "Create new Space"
3. Enter a name: `medical-symptom-checker`
4. Choose Space SDK: **Docker**
5. Create the space

### Step 2: Prepare Files

Create a `Dockerfile` in your repo root:

```dockerfile
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY --from=build-stage /app/dist ./dist
COPY app.py .
COPY index.html .

EXPOSE 7860
CMD ["python", "app.py"]
```

### Step 3: Push to Hugging Face

```bash
# Clone the HF space repo
git clone https://huggingface.co/spaces/YOUR_USERNAME/medical-symptom-checker
cd medical-symptom-checker

# Copy your files
cp -r ../medical-symptom-checker/* .

# Add and commit
git add .
git commit -m "Initial commit: Medical symptom checker app"

# Push to HF
git push
```

### Step 4: Configure Space Settings
1. Go to your space settings
2. Set **Space sleep time** to "Never" (for continuous availability)
3. Set **Visibility** to "Public"
4. Space will build automatically

## How to Use the App

### User Flow
1. **Start**: Click "Yes" or "No" for fever question
2. **Follow-ups**: If "Yes", answer follow-up questions (temperature, severity, etc.)
3. **Progress**: Watch progress bar as you answer questions
4. **Analysis**: App analyzes all symptoms
5. **Results**: Get possible disease prediction with:
   - Match percentage
   - Disease description
   - Recommended treatment
   - Important warnings
6. **Restart**: Click "Start Over" for new session

### Question Types
- **Yes/No**: Simple questions with two options
- **Numeric**: Temperature input
- **Range**: Severity scale 1-10
- **Multiple Choice**: Select from predefined options
- **Checkbox**: Select multiple answers

## Customizing Diseases & Symptoms

### Add New Disease

Edit `medical-diagnosis-app.jsx` and add to `diseases` array:

```javascript
{
  name: 'Disease Name',
  symptoms: ['symptom1', 'symptom2', 'symptom3'],
  requiredCount: 2,
  confidence: 85,
  description: 'Description of the disease',
  treatment: 'Recommended treatment',
  warning: 'Important warning or precaution',
}
```

### Add New Question

Add to `questions` array:

```javascript
{
  id: 'symptom_id',
  question: 'Do you have symptom X?',
  type: 'yes_no',
  followUp: 'Follow-up question?',
  followUpType: 'number', // or 'range', 'options', 'checkbox'
  followUpOptions: ['Option1', 'Option2'], // if needed
}
```

## API Endpoints (if using Flask backend)

### POST `/api/analyze`
Analyzes symptoms and predicts diseases

**Request:**
```json
{
  "symptoms": {
    "fever": true,
    "cough": true,
    "headache": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "predicted_disease": {
    "name": "Common Cold",
    "match_percentage": 85.5,
    "description": "...",
    "treatment": "...",
    "warning": "..."
  },
  "all_matches": [...]
}
```

## Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Change port in app.py:
app.run(host='0.0.0.0', port=8000)
```

### Module Not Found
```bash
# Ensure all dependencies are installed
pip install -r requirements.txt
npm install
```

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips
- App loads in ~2-3 seconds
- Responsive to user input (<100ms)
- Optimized for mobile devices
- Works offline after initial load

## Legal & Medical Disclaimer

⚠️ **Important**: This application is for **educational purposes only** and should **NOT** be used for:
- Self-diagnosis
- Replacing professional medical advice
- Treating medical conditions
- Making medical decisions

**Always consult a qualified healthcare professional** for:
- Accurate diagnosis
- Proper treatment plans
- Medical emergencies
- Any health concerns

## Security Notes
- No personal data is stored
- No external API calls
- All computation happens locally
- HTTPS recommended for deployment

## Support & Issues
- Check the troubleshooting section
- Review console for error messages
- Ensure all dependencies are installed
- Test locally before deploying

## License
Educational use only. Modify freely for your needs.

## Credits
Built with React, Flask, Vite, and ❤️ for medical education.
