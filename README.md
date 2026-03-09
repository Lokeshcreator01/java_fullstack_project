# 🛡️ SecureTrack: My First Full-Stack Journey

Welcome to **SecureTrack**! This is my very first full-stack web application. I built this to learn how to connect a modern frontend (React) with a powerful backend (Spring Boot) and a real-world database (MySQL).

## 🚀 Live Demo
**Check it out here:** [SecureTrack Live](https://java-fullstack-project.vercel.app)

This project was a huge learning milestone for me, covering everything from database design to secure authentication and cloud deployment.

---

## 🚀 The Learning Journey

Building this project taught me several key concepts in modern web development:

- **Full-Stack Integration:** How to make a React frontend talk to a Java REST API using Axios.
- **Security Basics:** Implementing JWT (JSON Web Tokens) for secure login and protecting routes.
- **Database Management:** Designing JPA entities and connecting Spring Boot to MySQL.
- **Modern Styling:** Learning the new **Tailwind CSS v4** and its PostCSS integration.
- **Problem Solving:** Overcoming real-world challenges like:
  - Resolving MySQL "Access Denied" and connection Dialect issues.
  - Fixing Jackson serialization errors with Hibernate lazy loading.
  - Deploying a Java app using **Docker** on Render.

---

## ✨ Features

- **User Authentication:** Sign up and log in securely.
- **Role-Based Views:** 
  - **Standard Users:** Can report new security incidents and view their own tickets.
  - **Admins:** Can see all tickets and update their status (Open -> In Progress -> Resolved).
- **Responsive Design:** A clean, glassmorphic UI that works on all screen sizes.

---

## 🛠️ Tech Stack I Mastered

### **Backend (The Brain)**
- **Language:** Java 17+
- **Framework:** Spring Boot 3.2
- **Security:** Spring Security & JWT
- **Data:** Spring Data JPA & MySQL
- **Tooling:** Maven & Docker (for deployment)

### **Frontend (The Face)**
- **Library:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router 6

---

## 🌐 Deployment & Hosting

This project is live thanks to these amazing free-tier cloud services:

- **Frontend Hosting:** [Vercel](https://vercel.com/) (Fast and easy React deployment).
- **Backend API Hosting:** [Render](https://render.com/) (Reliable hosting for Java/Spring Boot using Docker).
- **Database:** [Aiven](https://aiven.io/) (Managed MySQL database).

---

## ⚙️ How to Run Locally

If you'd like to try this project on your own machine:

1. **Database:** Create a MySQL database named `securetrack`.
2. **Backend:**
   - Go to `/backend`.
   - Update `application.properties` with your MySQL username and password.
   - Run: `mvn spring-boot:run`
3. **Frontend:**
   - Go to `/frontend`.
   - Run: `npm install` then `npm run dev`
4. **Access:** Visit `http://localhost:5173`!

---

## � My Next Steps
Now that I've completed my first full-stack project, I'm excited to:
- [ ] Add Email notifications for new tickets.
- [ ] Implement file uploads for incident screenshots.
- [ ] Explore more complex database relationships.

---
*Created with ❤️ as a learning project.*
