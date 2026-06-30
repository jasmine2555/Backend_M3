# Event Registration API

## Project Overview

The Event Registration API is a RESTful backend built with Node.js, Express, and TypeScript. It lets you create, read, update, and delete event records stored in Google Firestore. Each event includes details like title, type, dates, location, ticket price, and organizer email.

This API solves the problem of managing event data in one place. Instead of storing events in separate files or spreadsheets, developers and frontend apps can use standard HTTP requests to work with a shared database. Joi validation checks every request before data is saved, so bad input is caught early.

This project is for backend developers and students learning how to build secure, documented APIs. It is also useful for anyone building a frontend (like a React app) that needs to list or manage events through a clean JSON API.
