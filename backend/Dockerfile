#Build stage
FROM gradle:8.2.1-jdk17 AS BUILD
WORKDIR /app
COPY backend .
RUN gradle build --debug

# Use the official Azul 17 image as a parent image
FROM azul/zulu-openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file built by Gradle into the container
COPY --from=BUILD /app/build/libs/*.jar app.jar

# Expose port 8080 for the Spring Boot application
EXPOSE 8080

# Define the command to run your Spring Boot application
CMD ["java", "-jar", "app.jar"]
