<<<<<<< HEAD
# 🏥 Medical Symptom Checker (Java + JavaScript)

A rule-based symptom checker rebuilt with a **Java (Spring Boot)** backend and a
**JavaScript (React + Vite)** frontend — no Python anywhere. Ships as a single
Docker image, ready for Render's free web service tier.

## Stack

| Layer    | Technology                              |
|----------|------------------------------------------|
| Backend  | Java 17, Spring Boot 3 (REST API)         |
| Frontend | React 18, Vite (JavaScript, no TS)        |
| Container| Docker multi-stage build (Node → Maven → JRE) |
| Hosting  | Render.com free web service               |

The frontend is built with Vite and its static output is embedded straight
into the Spring Boot jar (`src/main/resources/static`), so the final image
runs **one process** — `java -jar app.jar` — that serves both the UI and the
`/api/*` endpoints. No separate static site or Node server needed at runtime.

## Project layout

```
medical-symptom-checker/
├── Dockerfile              # multi-stage build (this is all Render needs)
├── render.yaml             # optional: Render "Blueprint" for one-click deploy
├── backend/                # Java / Spring Boot
│   ├── pom.xml
│   └── src/main/java/com/symptomchecker/
│       ├── SymptomCheckerApplication.java
│       ├── controller/ApiController.java   # /api/health, /api/questions, /api/analyze
│       ├── model/                          # Disease, request/response DTOs
│       └── service/DiagnosisService.java   # matching logic (Java port of the JS rules)
└── frontend/                # JavaScript / React / Vite
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx          # calls the Java API, walks the question flow
        └── App.css
```

## API

| Method | Path            | Purpose                                        |
|--------|-----------------|-------------------------------------------------|
| GET    | `/api/health`   | Health check                                    |
| GET    | `/api/questions`| Ordered list of yes/no symptom questions        |
| POST   | `/api/analyze`  | Body: `{ "symptoms": { "fever": true, ... } }` → best-matching condition |

## Deploy to Render (free tier)

1. Push this folder to a GitHub repo.
2. On [render.com](https://render.com) → **New +** → **Web Service**.
3. Connect the repo. Render will detect the `Dockerfile` automatically
   (or use **New + → Blueprint** and point it at `render.yaml` for one-click setup).
4. Settings:
   - **Environment**: Docker
   - **Plan**: Free
   - Render sets the `PORT` env var itself — the app already reads it
     (`server.port=${PORT:8080}` in `application.properties`), so leave it as-is.
5. Click **Create Web Service**. First build takes a few minutes (Maven +
   npm install). Your app will be live at `https://<your-service>.onrender.com`.

> Free-tier services on Render spin down after inactivity and take ~30-50s to
> wake back up on the next request — that's normal, not a bug in this app.

## Run locally

**With Docker (closest to what Render runs):**
```bash
docker build -t symptom-checker .
docker run -p 7860:7860 symptom-checker
# open http://localhost:7860
```

**Without Docker, two terminals:**
```bash
# Terminal 1 — backend
cd backend
mvn spring-boot:run
# API on http://localhost:8080

# Terminal 2 — frontend (dev server proxies /api to 8080)
cd frontend
npm install
npm run dev
# UI on http://localhost:5173
```

## Customizing

- **Add/edit conditions or symptoms**: `backend/src/main/java/com/symptomchecker/service/DiagnosisService.java`
  (the `diseases` list) and the question list in
  `backend/src/main/java/com/symptomchecker/controller/ApiController.java`.
- **Styling**: `frontend/src/App.css`.

## ⚠️ Medical Disclaimer

Educational tool only — not a diagnostic device and not a substitute for
professional medical advice. Always consult a qualified healthcare
professional for real symptoms or emergencies.
=======
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
>>>>>>> 643e86322c150bd522269a1e62e0c19bc029ac94
