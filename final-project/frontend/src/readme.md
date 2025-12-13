# Full Stack Recipe Manager

## 1. Project Description and Features
The Full Stack Recipe Manager is a robust, multi-layered web application designed to demonstrate professional software engineering practices. It transcends a typical academic CRUD exercise by implementing a decoupled architecture, strict server-side validation, and containerized infrastructure.

### Key Features
- *Monorepo Architecture:* Hard separation between the frontend (React) and backend (Node/Express) directories.
- *SPA Mechanics:* Seamless navigation without page reloads using React Router DOM.
- *Proactive Security:* Immunity to SQL Injection via Parameterized Queries and credential protection via environment variable isolation.
- *Optimized Performance:* Database connection pooling to handle concurrent requests efficiently.
- *DevOps Readiness:* Fully containerized PostgreSQL database ensuring dependency isolation and environment parity.
- *Idempotent Seeding:* Rapid database reset capabilities via a custom initialization script.

---

## 2. Technology Stack

### Frontend (Presentation Layer)
- *Framework:* React.js (Vite)
- *Routing:* React Router DOM
- *State Management:* React Hooks (useState, useEffect) for asynchronous data flow
- *Styling:* CSS3

### Backend (Business Logic Layer)
- *Runtime:* Node.js
- *Framework:* Express.js
- *Architecture:* Model-View-Controller (MVC)
- *Validation:* Zod (Server-side schema validation)
- *Database Driver:* pg (node-postgres)

### Infrastructure
- *Database:* PostgreSQL
- *Containerization:* Docker
- *Configuration:* dotenv

---

## 3. Local Setup Instructions

Follow these steps to set up the development environment locally.

### Prerequisites
- Node.js (v18 or higher)
- Docker Desktop

### Step 1: Database Setup (Docker)
Start the isolated PostgreSQL container. This ensures the database environment is identical to the production configuration.

docker run --name pg-final-project -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

### Step 2: Backend Setup
Navigate to the backend directory, install dependencies, and initialize the database.

cd backend
npm install

# Initialize the database schema and seed data
npm run db:init

# Start the Express Server
npm run dev

The backend will start on http://localhost:3000.

### Step 3: Frontend Setup
Open a new terminal, navigate to the frontend directory, and start the Vite server.

cd frontend
npm install
npm run dev

The application will be accessible at http://localhost:5173.

---

## 4. Environment Variables Needed

Create a file named .env inside the backend/ folder. This file is excluded from version control to prevent credential leakage.

PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=postgres
DB_PORT=5432

---

## 5. Database Schema

The system uses a Relational Model with a One-to-Many (1:N) relationship between Categories and Recipes.

### Table: categories
- id: SERIAL PRIMARY KEY
- name: VARCHAR(50) UNIQUE NOT NULL

### Table: recipes
- id: SERIAL PRIMARY KEY
- title: VARCHAR(100) NOT NULL
- ingredients: TEXT NOT NULL
- instructions: TEXT NOT NULL
- category_id: INTEGER (Foreign Key referencing categories.id)
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

---

## 6. API Documentation

Base URL: http://localhost:3000/api

### Endpoints

#### GET /api/recipes
Retrieves all recipes with their associated category names.
- Response: 200 OK (JSON Array)

#### POST /api/recipes
Creates a new recipe. Validated by Zod schema.
- Body (JSON):
  {
    "title": "Recipe Title",
    "ingredients": "List of ingredients",
    "instructions": "Step by step instructions",
    "category_id": 1
  }
- Response: 201 Created

#### PUT /api/recipes/:id
Updates an existing recipe by ID.
- URL Params: id (Integer)
- Body (JSON): Same structure as POST.
- Response: 200 OK

#### DELETE /api/recipes/:id
Removes a recipe from the database.
- URL Params: id (Integer)
- Response: 204 No Content

#### GET /api/categories
Retrieves the list of available categories for the UI dropdowns.
- Response: 200 OK (JSON Array)