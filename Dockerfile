### Backend
##FROM maven:3.8.1-openjdk-17-slim AS build
##WORKDIR /GiroDelGusto
##COPY pom.xml .
##RUN mvn dependency:go-offline
##COPY src ./src
##RUN mvn package
##
### Frontend
##FROM node:20 AS frontend
##WORKDIR /GiroDelGusto
##COPY src/main/frontend/package*.json ./
##RUN npm install
##COPY src/main/frontend/ ./
##RUN npm run build
##
### Final image
##FROM openjdk:17-slim
##WORKDIR /GiroDelGusto
##COPY --from=build /GiroDelGusto/target/*.jar GiroDelGusto.jar
##COPY --from=frontend /GiroDelGusto/build/ ./static/
##EXPOSE 8080
##CMD ["java", "-jar", "GiroDelGusto.jar"]
#
## Backend build stage
#FROM maven:3.8.1-openjdk-17-slim AS build
#WORKDIR /GiroDelGusto
#COPY pom.xml .
#RUN mvn dependency:go-offline -B  # the `-B` option for batch mode can help reduce output and slightly improve build times
#COPY src ./src
#RUN mvn package -DskipTests  # skip tests during build to save time; ensure to run them in your CI/CD pipeline separately!
#
## Frontend build stage
#FROM node:20 AS frontend
#WORKDIR /GiroDelGusto
#COPY src/main/frontend/package*.json ./
#RUN npm ci --prefer-offline --no-audit  # use `npm ci` instead of `npm install` for faster, more reliable builds
#COPY src/main/frontend/ ./
#RUN npm run build
#
## Final image stage
#FROM openjdk:17-slim
#WORKDIR /GiroDelGusto
#COPY --from=build /GiroDelGusto/target/*.jar GiroDelGusto.jar
#COPY --from=frontend /GiroDelGusto/build/ ./static/
#EXPOSE 8080
#CMD ["java", "-jar", "GiroDelGusto.jar"]
#
## PostgreSQL as a separate service, assumed to be run as a separate container
