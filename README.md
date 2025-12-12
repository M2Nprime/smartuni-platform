# Smart Uni Platform (Phase 2) - Microservices Architecture

## 📖 Overview
Smart Uni Platform is a scalable, containerized backend system designed for managing university resources and course bookings. This project demonstrates a **Microservices Architecture** using **Node.js (CommonJS)**, **Express**, and **Docker**.

The system utilizes an **API Gateway** to route requests to appropriate services and handles authentication securely using **JWT (JSON Web Tokens)**.

## 🏗 Architecture
The project consists of three main decoupled services:

1.  **API Gateway (Port 3000):**
    * Entry point for all client requests.
    * Routes `/auth` requests to the Auth Service.
    * Routes `/resources` requests to the Resource Service.
    * Implemented using `http-proxy-middleware`.

2.  **Auth Service (Port 4001):**
    * Manages User Registration and Login.
    * Issues JWT tokens for secure access.
    * Database: SQLite (`auth.db`).

3.  **Resource Service (Port 4002):**
    * Manages Course creation and retrieval.
    * Handles the Booking logic (Decrementing capacity).
    * Protected by JWT verification.
    * Database: SQLite (`database.sqlite`).

## 🛠 Tech Stack
* **Runtime:** Node.js (v18)
* **Framework:** Express.js
* **Database:** SQLite (with Sequelize ORM)
* **Containerization:** Docker & Docker Compose
* **Authentication:** JSON Web Token (JWT)

---

## 🚀 Getting Started

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
* [Git](https://git-scm.com/) installed.
* **VS Code Extension:** "Thunder Client" (or use Postman) for testing APIs.

### Installation & First Run
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/smartuni-platform.git](https://github.com/YOUR_USERNAME/smartuni-platform.git)
    cd smartuni-platform
    ```

2.  **Build and Run with Docker:**
    Open your terminal in the project folder and run:
    ```bash
    docker-compose up --build
    ```

3.  **Verify Status:**
    Wait until you see the colorful logs.
    * Check **Docker Desktop**: You should see 3 containers running green.
    * Check **Browser**: Open `http://localhost:3000`. You should see: "API Gateway is Running...".

---

## 🔄 How to Restart & Use (Important)
Since this is a **Backend-Only** project, there is no graphical user interface (HTML website). You interact with the system using **API Requests**.

**To restart the project later:**
1.  Open Docker Desktop.
2.  Open your terminal/CMD in the project folder.
3.  Run: `docker-compose up`
4.  Open **Thunder Client** in VS Code to send requests (Register, Login, etc.).

---

## 🔌 API Endpoints Documentation
All requests should be sent to the **Gateway (Port 3000)**.

### 1. Authentication (Auth Service)

#### Register a new Admin
* **Method:** `POST`
* **URL:** `http://localhost:3000/auth/register`
* **Body (JSON):**
    ```json
    {
      "email": "admin@gmail.com",
      "password": "123",
      "role": "admin"
    }
    ```

#### Login
* **Method:** `POST`
* **URL:** `http://localhost:3000/auth/login`
* **Body (JSON):**
    ```json
    {
      "email": "admin@gmail.com",
      "password": "123"
    }
    ```
* **Response:** Returns a `token`. **Copy this token! You need it for the next steps.**

---

### 2. Resources & Booking (Resource Service)
*Note: These endpoints require the Authorization header.*
* **Header Name:** `Authorization`
* **Header Value:** `Bearer <YOUR_COPIED_TOKEN>`

#### Create a New Resource (Admin Only)
* **Method:** `POST`
* **URL:** `http://localhost:3000/resources`
* **Body (JSON):**
    ```json
    {
      "title": "Docker Mastery",
      "description": "Microservices implementation course",
      "fileUrl": "[http://example.com/video.mp4](http://example.com/video.mp4)",
      "type": "video",
      "capacity": 20
    }
    ```

#### Book a Resource
* **Method:** `POST`
* **URL:** `http://localhost:3000/resources/2/book`
* (Make sure the ID `2` matches the resource you just created)
* **Response:**
    ```json
    {
      "message": "Booking successful!",
      "bookedCount": 1
    }
    ```

## 👨‍💻 Author
Developed as a University Project for the Smart University Platform.