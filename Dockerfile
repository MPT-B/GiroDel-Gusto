# Backend
FROM maven:3.8.1-openjdk-17-slim AS build
WORKDIR /GiroDelGusto
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package

# Frontend
FROM node:20 AS frontend
WORKDIR /GiroDelGusto
COPY src/main/frontend/package*.json ./
RUN npm install
COPY src/main/frontend/ ./
RUN npm run build

# Final image
FROM openjdk:17-slim
WORKDIR /GiroDelGusto
COPY --from=build /GiroDelGusto/target/*.jar GiroDelGusto.jar
COPY --from=frontend /GiroDelGusto/build/ ./static/
EXPOSE 8080
CMD ["java", "-jar", "GiroDelGusto.jar"]