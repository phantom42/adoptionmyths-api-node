# Adoption Myths API

A RESTful API built with Node.js, Express, and TypeScript that serves content for [adoption-myths.com](https://adoption-myths.com) — a resource dedicated to addressing common misconceptions about adoption.

**Live API:** [adoptionmyths-api-node.vercel.app](https://adoptionmyths-api-node.vercel.app)  
**Frontend:** [adoptionmyths-react](https://github.com/phantom42/adoptionmyths-react)

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Deployment:** Vercel (serverless)

---

## Features

- RESTful endpoints for fetching and managing adoption myth content
- API key authentication middleware
- CORS configured for production and local development origins
- Structured MVC architecture (controllers, models, routes, middleware, utils)
- Serverless-compatible entry point for Vercel deployment

---

## Project Structure

```
├── config/         # Database connection
├── controllers/    # Route handler logic
├── middleware/     # Auth and other middleware
├── models/         # Mongoose data models
├── routes/         # Express route definitions
│   └── api/
├── utils/          # Shared utility functions
├── public/         # Static assets
└── index.ts        # App entry point
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB connection string (MongoDB Atlas or local)

### Installation

```bash
git clone https://github.com/phantom42/adoptionmyths-api-node.git
cd adoptionmyths-api-node
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
MAA_API_KEY=your_X-API-KEY
```

### Run Locally

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

---

## API Endpoints

All endpoints require an `X-API-Key` header for authorization.

| Method | Endpoint            | Description                             |
| ------ | ------------------- | --------------------------------------- |
| GET    | `/myths/all`        | Returns all adoption myths              |
| GET    | `/myths/randomized` | Returns all myths in randomized order   |
| GET    | `/myths/random`     | Returns a single randomly selected myth |

---

## Deployment

This project is deployed as a serverless function on Vercel. The `vercel.json` config routes all requests through the Express app entry point.

To deploy your own instance:

```bash
npm install -g vercel
vercel
```

---

## Related

- [adoptionmyths-react](https://github.com/phantom42/adoptionmyths-react) — React/TypeScript frontend that consumes this API
