# Event Registration API

## Project Overview

The Event Registration API is a RESTful backend built with Node.js, Express, and TypeScript. It lets you create, read, update, and delete event records stored in Google Firestore. Each event includes details like title, type, dates, location, ticket price, and organizer email.

This API solves the problem of managing event data in one place. Instead of storing events in separate files or spreadsheets, developers and frontend apps can use standard HTTP requests to work with a shared database. Joi validation checks every request before data is saved, so bad input is caught early.

This project is for backend developers and students learning how to build secure, documented APIs. It is also useful for anyone building a frontend (like a React app) that needs to list or manage events through a clean JSON API.

## Installation Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) version **20.x** or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Firebase project with Firestore enabled
- Your Firebase service account JSON file

### Installation Commands

1. Clone the repository and go into the project folder:

```bash
git clone https://github.com/jasmine2555/Backend_M3.git
cd Backend_M3
```

2. Install dependencies:

```bash
npm install
```

### Environment Variable Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Open `.env` and fill in your own values:

```env
PORT=3000
NODE_ENV=development
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_SERVICE_ACCOUNT_PATH=firebase-service-account.json
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

3. Place your Firebase service account JSON file in the project root (the file name should match `FIREBASE_SERVICE_ACCOUNT_PATH`).

> **Note:** Never commit your `.env` file or Firebase credentials to GitHub. The `.gitignore` file already excludes them.

### Starting the Server

Run the development server:

```bash
npm run dev
```

Or start without auto-reload:

```bash
npm start
```

You should see:

```
Server is running on port 3000
```

The API is now available at `http://localhost:3000`.

## API Request Examples

### Health Check

**Request:**

```bash
curl -X GET http://localhost:3000/api/v1/health
```

**Response (200 OK):**

```json
{
  "status": "OK",
  "uptime": 12.345,
  "timestamp": "2026-06-29T12:00:00.000Z",
  "version": "1.0.0"
}
```

### Get All Events

**Request:**

```bash
curl -X GET http://localhost:3000/api/v1/events
```

**Response (200 OK):**

```json
{
  "message": "Events retrieved",
  "count": 1,
  "data": [
    {
      "id": "x6OGrXJ9mZ429vJrrE0",
      "title": "Tech Conference 2025",
      "description": "Annual technology conference",
      "eventType": "conference",
      "startDate": "2026-12-20T09:00:00.000Z",
      "endDate": "2026-12-20T17:00:00.000Z",
      "location": "Convention Center Hall A",
      "isVirtual": false,
      "maxAttendees": 500,
      "ticketPrice": 49.99,
      "isPaid": true,
      "organizerEmail": "organizer@example.com",
      "createdAt": "2026-06-29T10:00:00.000Z",
      "updatedAt": "2026-06-29T10:00:00.000Z"
    }
  ]
}
```

### Create Event

**Request:**

```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Conference 2025",
    "description": "Annual technology conference",
    "eventType": "conference",
    "startDate": "2026-12-20T09:00:00.000Z",
    "endDate": "2026-12-20T17:00:00.000Z",
    "location": "Convention Center Hall A",
    "isVirtual": false,
    "maxAttendees": 500,
    "ticketPrice": 49.99,
    "isPaid": true,
    "organizerEmail": "organizer@example.com"
  }'
```

**Response (201 Created):**

```json
{
  "message": "Event created",
  "data": {
    "id": "x6OGrXJ9mZ429vJrrE0",
    "title": "Tech Conference 2025",
    "description": "Annual technology conference",
    "eventType": "conference",
    "startDate": "2026-12-20T09:00:00.000Z",
    "endDate": "2026-12-20T17:00:00.000Z",
    "location": "Convention Center Hall A",
    "isVirtual": false,
    "maxAttendees": 500,
    "ticketPrice": 49.99,
    "isPaid": true,
    "organizerEmail": "organizer@example.com",
    "createdAt": "2026-06-29T10:00:00.000Z",
    "updatedAt": "2026-06-29T10:00:00.000Z"
  }
}
```

## API Documentation

Full API documentation is available at:

**GitHub Pages (deployed):** https://jasmine2555.github.io/Backend_M3/

When running locally, access the interactive Swagger UI at:

**Local Swagger UI:** http://localhost:3000/api-docs
