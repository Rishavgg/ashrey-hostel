FROM openjdk:17-jdk-slim
EXPOSE 9090
COPY jars/ashrey-0.0.1-SNAPSHOT.jar manager-ashrey.jar
ENTRYPOINT ["java", "-jar", "/manager-ashrey.jar"]