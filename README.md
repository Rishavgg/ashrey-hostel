# Hostel Management System [G78]

## Video
[![Watch the video](https://github.com/user-attachments/assets/17d31a67-e2a4-4580-9eb8-4ab97297b90c)](https://drive.google.com/file/d/1FZ4LHD8pz4orPLfjhsguTgeW03ZT5xIt/view?usp=sharing)

## Overview
This project is a microservices-based Hostel Management System developed using Spring Boot. It manages hostel room allocations, complaints, outpass applications, and various user roles such as Admin, Chief Warden, Warden, Caretaker, and Student. The system leverages Keycloak for authentication, Eureka for service discovery, and Docker for containerization.

## Features
- **User Authentication & Role Management**:
  - Admin, Chief Warden, Warden, Caretaker, and Student roles.
  - Keycloak-based authentication and role-based authorization.
  
- **Room Management**:
  - Manage room availability and allocation.
  - Room features such as sunlight, balcony, and vacancy status.

- **Complaint Management**:
  - Students can file complaints regarding hostel issues.
  - Caretakers can view, manage, and resolve complaints.

- **Outpass Management**:
  - Students can apply for outpasses.
  - Wardens can approve or deny outpass requests.

- **Automated Room Allocation**:
  - Room allocation algorithm based on CGPA, medical needs, and club roles.
  - Initiated by the Chief Warden at the end of the academic year.

- **Notification System** (Optional):
  - Notifications for room allocations, outpass approvals, and complaints.
  - Can integrate email and in-app notifications.

## Microservices
The project is divided into several microservices:

### 1. **User Authentication Service**
   - Handles user login and authentication for all user roles.
   - Manages user credentials and JWT-based authentication.

### 2. **Student Service**
   - Manages student profiles and personal details.
   - Students can view room availability, apply for rooms, and file complaints.

### 3. **Warden Service**
   - Handles room allocations for students.
   - Manages outpass requests from students.
   - Sends notifications to students for room and outpass-related actions.

### 4. **Room Management Service**
   - Manages hostel room inventory, including room features and status.
   - Tracks room availability and assignment.

### 5. **Staff Management Service**
   - Handles complaints submitted by students.
   - Caretakers can manage and resolve complaints.

### 6. **Notification Service** (Optional)
   - Sends email and in-app notifications for events such as room allocations, outpass approvals, and complaint resolutions.

## Technology Stack
- **Spring Boot**
- **Spring Cloud** (Eureka, Config Server)
- **Keycloak** for Authentication and Authorization
- **Docker** for Containerization
- **MySQL** for Database Management
- **Kafka or RabbitMQ** (Optional for asynchronous communication)
- **Lombok** (for reducing boilerplate code)
- **Feign Clients** (for inter-service communication)

## Prerequisites
- **Java 11+**
- **Python 3.10+**
- **Maven**
- **Docker**
- **PostgreSQL**
- **Keycloak**

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Rishavgg/ashrey-hostel.git
cd ashrey-hostel
```

## Run Frontend

### 1. Navigate to the project directory:

```bash
cd ashrey-hostel/frontend/ashrey-front
```
### 2.Install the project dependencies:

```bash
npm install
```
#### 2.1 If dependencies problem occur:
```bash
npm install --legacy-peer-deps
```

### 3. Install Vite

```bash
npm install -g vite --legacy-peer-deps
```

### 4. If Vite is missing from the devDependencies, install it as a devDependency:

```bash
npm install vite --save-dev --legacy-peer-deps 
```
#### 4.1 Tailwind update
```bash
npm install tailwindcss @tailwindcss/vite --legacy-peer-deps
```

### 5. To start the development server:

```bash
npm dev run
```
