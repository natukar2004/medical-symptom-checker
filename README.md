# 🏥 Medical Symptom Checker

> An interactive web app that analyzes your symptoms and suggests possible conditions — built with React and Flask, deployable in minutes on Hugging Face Spaces.


## 📖 About the Project

Medical Symptom Checker is a lightweight, privacy-first health education tool. It guides users through a series of yes/no symptom questions and uses a rule-based matching engine to identify the most likely condition from a set of common diseases. Results include a confidence score, a plain-English description of the condition, recommended treatment approaches, and important safety warnings.

The entire app runs in the browser — there is no database, no login, no tracking, and no personal data ever leaves the user's device.

---

## ✨ Features

- **18-question symptom survey** — covers fever, pain, respiratory, digestive, and neurological symptoms
- **6 condition profiles** — Common Cold, Influenza, Dengue Fever, Migraine, Gastroenteritis, Arthritis
- **Confidence scoring** — shows how closely symptoms match each condition as a percentage
- **Treatment guidance** — actionable next steps for each possible diagnosis
- **Safety warnings** — flags conditions requiring urgent medical attention
- **No build step** — React is loaded via CDN; just run `python app.py` and go
- **Mobile friendly** — responsive layout works on phones and tablets
- **Zero data retention** — nothing is stored, logged, or transmitted


## 🧠 How the Symptom Matching Works

Each of the 6 conditions has a predefined list of associated symptoms. When the user completes the questionnaire, the app counts how many of a condition's symptoms were reported as "Yes" and expresses that as a percentage of the condition's total symptom count. The condition with the highest score above 50% is returned as the result. If no condition clears the threshold, the user is advised to consult a healthcare professional directly.

| Condition | Key Symptoms |
|-----------|-------------|
| Common Cold | Fever, cough, sore throat, runny nose, headache |
| Influenza | Fever, cough, body pain, fatigue, headache |
| Dengue Fever | Fever, headache, body pain, joint pain, rash |
| Migraine | Headache, nausea, light sensitivity, vision changes |
| Gastroenteritis | Vomiting, diarrhea, stomach pain, nausea, fever |
| Arthritis | Joint pain, ankle pain, swelling, stiffness |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.9, Flask 2.3, Gunicorn |
| Frontend | React 18 (CDN), Babel Standalone |
| Styling | Vanilla CSS with CSS variables |
| Container | Docker (python:3.9-slim base image) |
| Hosting | Hugging Face Spaces (Docker SDK) |

---

## ⚙️ Configuration

The app reads one environment variable:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `7860` | Port the Flask server listens on |

---

## ⚠️ Medical Disclaimer

This application is intended for **educational and informational purposes only**.

- ❌ It is **not** a diagnostic tool
- ❌ It is **not** a replacement for professional medical advice
- ❌ It should **not** be used in emergencies

**Always consult a qualified healthcare professional** for any health concerns, symptoms, or medical decisions.

---

## 📄 License

Free to use and modify for educational purposes.

---

*Made with ❤️ for health awareness — please use responsibly.*
