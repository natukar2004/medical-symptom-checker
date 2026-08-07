# ---------- Stage 1: build the JavaScript (React/Vite) frontend ----------
FROM node:20-slim AS frontend-build
WORKDIR /frontend
COPY frontend/package.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ---------- Stage 2: build the Java (Spring Boot) backend ----------
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /backend
COPY backend/pom.xml ./
RUN mvn -B dependency:go-offline
COPY backend/src ./src
# Embed the built frontend into Spring Boot's static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static
RUN mvn -B clean package -DskipTests

# ---------- Stage 3: minimal runtime image ----------
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=backend-build /backend/target/app.jar ./app.jar

# Render supplies PORT at runtime; Spring Boot reads it via application.properties
EXPOSE 7860
ENV PORT=7860

CMD ["java", "-jar", "app.jar"]
