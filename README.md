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
