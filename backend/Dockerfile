# Use the official OpenJDK image as a parent image
FROM openjdk:20-jre

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file built by Gradle into the container
COPY build/libs/*.jar app.jar

# Expose port 8080 for the Spring Boot application
EXPOSE 8080

# Define the command to run your Spring Boot application
CMD ["java", "-jar", "app.jar"]

# Use the official OpenJDK 17 image as a parent image
FROM azul/zulu-openjdk:20
