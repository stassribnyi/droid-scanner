# Droid Scanner Backend

This is the backend part of the Droid Scanner project, which is responsible for managing and analyzing droids. Follow the instructions below to set up MongoDB and build the project using Java and Gradle.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Java Development Kit (JDK)](https://www.azul.com/downloads/?package=jdk#zulu)
- [Gradle](https://gradle.org/install/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

## Setup MongoDB

1. Install MongoDB by following the [official installation guide](https://docs.mongodb.com/manual/installation/).

2. Start the MongoDB service:

   ```bash
   sudo service mongod start

    Create a MongoDB database for the Droid Scanner project:

    bash

    mongo
    > use droidscanner

3. Build and Run the Project

    Clone this repository to your local machine:

    ```bash
   git clone https://github.com/stassribnyi/droid-scanner.git

Change your working directory to the backend folder:

   ```bash
   cd droid-scanner/backend
   ```
Build the project using Gradle:

   ```bash
./gradlew build
   ```

Run the application:

   ```bash
    ./gradlew bootRun
   ```

The application will start, and you can access it at http://localhost:8080.

