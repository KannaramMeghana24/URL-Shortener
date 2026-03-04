## URL Shortener

A full-stack URL shortening web application that converts long URLs into short, shareable links and tracks analytics such as click counts and creation time.

The application also supports custom aliases, URL management, and a simple analytics dashboard for monitoring shortened links.

This project demonstrates a complete MERN-style architecture with a modern frontend and a scalable backend deployed on cloud platforms.

---

## Live Demo

Frontend
https://url-shortener-kappa-smoky.vercel.app

Backend API
https://url-shortener-backend-pme4.onrender.com

---

## Features

### URL Shortening

Users can convert long URLs into short links that are easier to share.

### Custom Alias Support

Users can create their own custom short code for shortened URLs.

### Analytics Dashboard

The application includes a dashboard that displays:

Original URL
Short Code
Number of Clicks
Creation Date
Delete Option

This helps users track how many times a link has been accessed.

### Click Tracking

Every time a shortened link is opened, the backend increments the click count stored in the database. This enables basic link analytics.

### Search Functionality

Users can search links in the analytics dashboard using:

Original URL
Short Code

### URL Deletion

Users can remove links from the system directly from the dashboard.

---

## How the System Works

1. User enters a long URL in the frontend interface.
2. The frontend sends an API request to the backend.
3. The backend generates a unique short code.
4. MongoDB stores the original URL along with the short code and metadata.
5. When a shortened link is opened, the system redirects the user to the original URL and updates the click count.

---

## Tech Stack

### Frontend

React,
Axios,
Vite,
CSS,

### Backend

Node.js,
Express.js

### Database

MongoDB Atlas,
Mongoose

### Deployment

Vercel (Frontend),
Render (Backend)

---

## Installation and Setup

### Clone the Repository

```
git clone https://github.com/KannaramMeghana24/URL-Shortener.git
```

```
cd URL-Shortener
```

---

## Run Backend

```
cd server
npm install
```

Start the server:

```
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

## Run Frontend

Open a new terminal:

```
cd client
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```
