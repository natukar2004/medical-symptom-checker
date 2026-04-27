# 🚀 Quick Start Guide - Deploy in 5 Minutes

## Option 1: Deploy to Hugging Face Spaces (Recommended)

### What you need:
- Hugging Face account (free at huggingface.co)
- Git

### Steps:

1. **Create Hugging Face Space**
   - Go to https://huggingface.co/spaces
   - Click "Create new Space"
   - Name: `medical-symptom-checker`
   - Select SDK: **Docker**
   - Visibility: **Public**
   - Click "Create Space"

2. **Get Space Git URL**
   - Open the space
   - Click "Files and Versions" 
   - Copy the git URL at bottom

3. **Clone & Push Code**
```bash
# Clone the HF space
git clone https://huggingface.co/spaces/YOUR_USERNAME/medical-symptom-checker
cd medical-symptom-checker

# Copy all files from this project into the folder
cp -r /path/to/medical-app/* .

# Push to Hugging Face
git add .
git commit -m "Initial commit: Medical app"
git push
```

4. **Done!** 
   - Wait 2-5 minutes for build
   - Your app runs at: `https://huggingface.co/spaces/YOUR_USERNAME/medical-symptom-checker`

---

## Option 2: Run Locally with Docker

```bash
# Build image
docker build -t medical-app .

# Run container
docker run -p 7860:7860 medical-app

# Open browser to http://localhost:7860
```

---

## Option 3: Run Locally without Docker

```bash
# Install dependencies
npm install
pip install -r requirements.txt

# Build React app
npm run build

# Run Flask server
python app.py

# Open browser to http://localhost:7860
```

---

## File Structure Needed for HF Spaces:

```
your-space-folder/
├── Dockerfile
├── package.json
├── package-lock.json
├── requirements.txt
├── app.py
├── index.html
├── main.jsx
├── medical-diagnosis-app.jsx
├── vite.config.js
└── .dockerignore (optional)
```

---

## Troubleshooting HF Spaces Build

**Space won't build?**
- Check Logs in space settings
- Ensure all files are pushed with `git push`
- Wait for completion (shows "Running" status)

**Port issues?**
- HF Spaces uses port 7860 by default
- Don't change the port!

**Dependencies missing?**
- Add to `requirements.txt` for Python
- Add to `package.json` for Node

---

## Testing Locally First (Recommended)

```bash
# 1. Clone this repo
git clone <repo-url>
cd medical-symptom-checker

# 2. Install dependencies
npm install
pip install -r requirements.txt

# 3. Build
npm run build

# 4. Test with Docker
docker build -t medical-app .
docker run -p 7860:7860 medical-app

# 5. Open browser
# http://localhost:7860

# 6. If works, push to HF Spaces!
```

---

## Key File Descriptions

| File | Purpose |
|------|---------|
| `medical-diagnosis-app.jsx` | Main React component with all logic |
| `app.py` | Flask backend server |
| `Dockerfile` | Container config for HF Spaces |
| `package.json` | Node dependencies |
| `requirements.txt` | Python dependencies |
| `index.html` | HTML template |
| `main.jsx` | React entry point |
| `vite.config.js` | Build configuration |

---

## How to Customize

**Add new disease:**
Edit `medical-diagnosis-app.jsx`, find `diseases` array, add:
```javascript
{
  name: 'Your Disease',
  symptoms: ['symptom1', 'symptom2'],
  requiredCount: 2,
  confidence: 85,
  description: 'Description',
  treatment: 'Treatment',
  warning: 'Warning'
}
```

**Add new symptom question:**
Edit `medical-diagnosis-app.jsx`, find `questions` array, add:
```javascript
{
  id: 'new_symptom',
  question: 'Your question here?',
  type: 'yes_no',
}
```

---

## Performance Expected

- **Load time**: 2-3 seconds
- **Response time**: <100ms
- **Works offline**: Yes (after first load)
- **Mobile friendly**: Yes
- **Browser support**: All modern browsers

---

## Security & Privacy

✅ No data stored
✅ No external API calls
✅ All processing local
✅ No tracking
✅ No account needed to use

---

## Need Help?

1. Check console (F12) for errors
2. Verify all files exist
3. Check file permissions
4. Test locally first before HF
5. Review error messages carefully

---

**Ready to deploy? Start with Option 1 for easiest setup!** 🎉
