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
