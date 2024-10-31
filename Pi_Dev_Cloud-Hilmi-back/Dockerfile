# Use the official Maven image to build the project
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and the source code to the container
COPY pom.xml .
COPY src ./src

# Build the project
RUN mvn clean install

# Use the official OpenJDK image as the base image for the final stage
FROM openjdk:17-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/e-learning-back-0.0.1-SNAPSHOT.jar /app/e-learning-back-0.0.1-SNAPSHOT.jar

# Expose the port on which the application runs
EXPOSE 8080

# Define the command to run the application
CMD ["java", "-jar", "e-learning-back-0.
