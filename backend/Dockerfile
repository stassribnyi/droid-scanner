# Use the official Azul 20 image as a parent image
FROM azul/zulu-openjdk:20

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file built by Gradle into the container
COPY backend/build/libs/*.jar app.jar

# Expose port 8080 for the Spring Boot application
EXPOSE 8080

# Define the command to run your Spring Boot application
CMD ["java", "-jar", "app.jar"]
