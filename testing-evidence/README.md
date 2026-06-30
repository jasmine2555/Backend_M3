# Assignment 5 — Testing Evidence

**Student ID:** 0404057  
**Postman collection name:** `M5-0404057`

Place your **8 required screenshots** in this folder.

> **Important:** Your student ID (`0404057`) must be clearly visible in **every** screenshot. Use the Postman collection name `M5-0404057`, a bookmark in your browser, or a sticky note on screen.

---

## Screenshot Checklist

| # | Screenshot | How to capture |
|---|------------|----------------|
| 1 | **Helmet security headers** | Postman or DevTools → Network → Headers tab on any API request (e.g. Health Check). Show headers like `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`. |
| 2 | **CORS response headers** | Send a GET request with an `Origin` header (e.g. `http://localhost:5173`). Show `Access-Control-Allow-Origin` and related CORS headers in the response. |
| 3 | **OPTIONS preflight request** | Send `OPTIONS` to `/api/v1/events` with `Origin` and `Access-Control-Request-Method` headers. Show `204` response with allowed methods and headers. |
| 4 | **Swagger UI (local)** | Open `http://localhost:3000/api-docs` in browser. Show API title, description, and list of endpoints. |
| 5 | **Swagger endpoint detail** | Expand one endpoint in Swagger UI. Show parameters, request body schema, or response schema. |
| 6 | **GitHub Pages documentation** | Open `https://jasmine2555.github.io/Backend_M3/` in browser. Show the live documentation with URL visible. |
| 7 | **Environment variables (.env)** | Show your `.env` file open in the editor (hide any real secrets) or terminal output showing server starting on port from `PORT` env variable. |
| 8 | **Helmet on a different endpoint** | Repeat screenshot 1 on a **different** endpoint (e.g. `/api/v1/events` instead of health) to prove headers are applied globally. |

---

## Postman Setup

1. Create a new collection named **`M5-0404057`**
2. Add requests for Health Check, Get Events, Create Event, etc.
3. The collection name must be visible in every Postman screenshot

---

## Browser Setup (for DevTools / GitHub Pages screenshots)

To show student ID in browser screenshots, use one of these:

- Bookmark in the bookmarks bar named `0404057`
- Sticky note on screen with your student ID
- Text file open in another window showing `0404057`

---

## Before Submitting

- [ ] All 8 screenshots saved in this folder
- [ ] Student ID `0404057` visible in every screenshot
- [ ] Screenshots are clear and not cropped
- [ ] Content matches your submitted code repository
