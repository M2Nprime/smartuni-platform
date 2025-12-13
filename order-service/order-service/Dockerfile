# Use Eclipse Temurin OpenJDK 17 as base image
FROM eclipse-temurin:17-jre-alpine

# Set working directory inside container
WORKDIR /app

# Copy built jar file into container
COPY target/order-service-0.0.1-SNAPSHOT.jar app.jar

# Expose port 4003
EXPOSE 4003

# Run the jar
ENTRYPOINT ["java","-jar","app.jar"]