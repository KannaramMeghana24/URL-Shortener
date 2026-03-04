### URL Shortener

A full-stack URL Shortening Web Application that converts long URLs into short, shareable links and tracks analytics such as click counts and creation time.

The application also supports custom aliases, URL management, and a simple analytics dashboard for monitoring shortened links.

This project demonstrates a complete MERN-style architecture with a modern frontend and a scalable backend deployed on cloud platforms.

---

### Live Demo

Frontend
https://url-shortener-kappa-smoky.vercel.app

Backend API
https://url-shortener-backend-pme4.onrender.com

---

### Features

#### URL Shortening

Users can convert long URLs into short links that are easier to share.

#### Custom Alias Support

Users can create their own custom short code.

#### Analytics Dashboard

The application includes a dashboard that displays:

Original URL
Short Code
Number of Clicks
Creation Date
Delete Option

This helps users track how many times a link has been accessed.

#### Click Tracking

Every time a shortened link is opened, the backend increments the click count stored in the database.

This enables basic link analytics.

#### Search Functionality

Users can search links in the analytics dashboard using:

Original URL
Short Code

#### URL Deletion

Users can remove links from the system directly from the dashboard.

---

### How the System Works

User Enters Long URL
Frontend Sends API Request
Backend Generates Short Code
MongoDB Stores Data
Redirect System

---

### Tech Stack

Frontend
React
Axios
Vite
CSS

Backend
Node.js
Express.js

Database
MongoDB Atlas
Mongoose

Deployment
Vercel (Frontend)
Render (Backend)

---

### Installation and Setup

Clone Repository

```
git clone https://github.com/KannaramMeghana24/URL-Shortener.git
```

```
cd URL-Shortener
```

---

### Run Backend

```
cd server
npm install
```

Run server

```
npm start
```

Server runs at

```
http://localhost:5000
```

---

### Run Frontend

Open new terminal

```
cd client
npm install
npm run dev
```

Frontend runs at

```
http://localhost:5173
```
