#Build stage
FROM gradle:8.4-jdk20 AS BUILD
WORKDIR /app
COPY backend .

RUN ./gradlew clean build

# Use the official Azul 19 image as a parent image
FROM azul/zulu-openjdk:20

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file built by Gradle into the container
COPY --from=BUILD /app/build/libs/*.jar app.jar

# Expose port 8080 for the Spring Boot application
EXPOSE 8080

# Define the command to run your Spring Boot application
CMD ["java", "-jar", "app.jar"]
