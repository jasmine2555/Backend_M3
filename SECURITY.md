Assignment 5
# Security Configuration

This document explains the security configuration choices for the Event Registration API. Each decision is justified for an API-only backend that returns JSON and does not serve HTML pages.

---

## Helmet.js Configuration

**Configuration file:** `src/config/helmetConfig.ts`

### What Was Configured

| Option | Setting | Header / Effect |
|--------|---------|-----------------|
| `contentSecurityPolicy` | `false` | CSP disabled |
| `crossOriginEmbedderPolicy` | `false` | COEP disabled |
| `crossOriginResourcePolicy` | `cross-origin` | `Cross-Origin-Resource-Policy` |
| `dnsPrefetchControl` | `allow: false` | `X-DNS-Prefetch-Control: off` |
| `frameguard` | `action: "deny"` | `X-Frame-Options: DENY` |
| `hidePoweredBy` | `true` | Removes `X-Powered-By` |
| `hsts` | `maxAge: 31536000`, `includeSubDomains`, `preload` | `Strict-Transport-Security` |
| `ieNoOpen` | `true` | `X-Download-Options: noopen` |
| `noSniff` | `true` | `X-Content-Type-Options: nosniff` |
| `referrerPolicy` | `no-referrer` | `Referrer-Policy: no-referrer` |
| `xssFilter` | `true` | `X-XSS-Protection: 0` (legacy browsers) |

### Why These Choices Were Made

1. **`contentSecurityPolicy: false`** — Content Security Policy is designed to control which scripts, styles, and resources a browser loads when rendering HTML. This API only returns JSON responses and does not serve web pages, so CSP adds no meaningful protection against XSS in this context.

2. **`frameguard: { action: "deny" }`** — Prevents the API response from being embedded in an iframe, which reduces clickjacking risk if any HTML error pages or documentation are ever served from the same origin.

3. **`hsts` with 1-year max-age** — Instructs browsers to always use HTTPS for this domain in production, preventing protocol downgrade attacks. Critical for production APIs handling sensitive event registration data.

4. **`noSniff: true`** — Stops browsers from MIME-sniffing responses away from the declared `Content-Type`, ensuring JSON responses are not interpreted as executable content.

5. **`hidePoweredBy: true`** — Removes the `X-Powered-By: Express` header to avoid disclosing server technology to attackers.

6. **`ieNoOpen: true`** — Sets `X-Download-Options: noopen` to prevent Internet Explorer from opening untrusted downloads in the site context.

7. **`dnsPrefetchControl: { allow: false }`** — Disables DNS prefetching to reduce information leakage about third-party resources.

8. **`referrerPolicy: { policy: "no-referrer" }`** — Prevents referrer URLs from being sent to external services, protecting internal API paths from leaking.

### External Sources (Helmet)

1. [Helmet.js Official Documentation](https://helmetjs.github.io/) — Documents each middleware option and the HTTP headers it sets.
2. [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/) — Recommends `X-Frame-Options`, `Strict-Transport-Security`, and `X-Content-Type-Options` as baseline HTTP security headers.
3. [MDN: Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) — Explains why HSTS is critical for enforcing HTTPS connections.

---

## CORS Configuration

**Configuration file:** `src/config/corsConfig.ts`

### What Was Configured

| Option | Setting |
|--------|---------|
| `origin` | Dynamic whitelist from `CORS_ORIGIN` environment variable |
| `methods` | `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS` |
| `allowedHeaders` | `Content-Type`, `Authorization` |
| `exposedHeaders` | `Content-Length`, `X-Request-Id` |
| `credentials` | `true` |
| `maxAge` | `86400` (24 hours) |
| `optionsSuccessStatus` | `204` |

**Default allowed origins (via `.env`):**
- `http://localhost:3000`
- `http://localhost:5173`

### Why These Choices Were Made

1. **Origin whitelist (not `*`)** — Only explicitly listed frontend origins may access the API. Using a wildcard (`*`) would allow any website to make requests to the API, which is unsafe when credentials are enabled.

2. **`methods` restricted to REST verbs** — Only the HTTP methods used by this API (`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`) are permitted. This follows the principle of least privilege.

3. **`allowedHeaders: Content-Type, Authorization`** — Only headers required by this API are allowed. `Content-Type` is needed for JSON request bodies; `Authorization` supports future token-based authentication.

4. **`credentials: true`** — Allows browsers to include cookies and authorization headers in cross-origin requests. Required if a frontend on a different port (e.g., `localhost:5173`) needs authenticated access.

5. **`maxAge: 86400`** — Caches preflight `OPTIONS` responses for 24 hours, reducing redundant preflight requests and improving performance for frontend clients.

6. **`optionsSuccessStatus: 204`** — Returns `204 No Content` for successful preflight responses, which is the standard for APIs that do not return a body on OPTIONS requests.

7. **Origins loaded from environment variables** — Allowed origins are configured in `.env` rather than hardcoded, so production and development can use different values without code changes.

### External Sources (CORS)

1. [MDN: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) — Explains how browsers enforce the same-origin policy and why server-side CORS configuration is required.
2. [Express cors middleware documentation](https://github.com/expressjs/cors#configuration-options) — Documents each CORS option and recommended configuration patterns.
3. [OWASP: HTML5 Security Cheat Sheet — CORS](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#cross-origin-resource-sharing) — Warns against using `Access-Control-Allow-Origin: *` with credentials and recommends explicit origin whitelisting.

---

## Environment Variables

Sensitive configuration is stored in `.env` (never committed). See `.env.example` for required variables.

| Variable | Purpose |
|----------|---------|
| `PORT` | Server port |
| `FIREBASE_PROJECT_ID` | Firebase project identifier |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Path to Firebase credentials file |
| `CORS_ORIGIN` | Comma-separated list of allowed frontend origins |

---

## Verification

Security headers and CORS can be verified using:

- **Postman** — Inspect response headers on any endpoint
- **Browser DevTools** — Network tab → select request → Headers
- **OPTIONS preflight** — Send OPTIONS to `/api/v1/events` with an `Origin` header

Evidence screenshots are stored in `testing-evidence/`.
