# Warehouse Management System (WMS)

Version 1 scaffolds a mobile-first Warehouse Management System for small and medium businesses.

## Stack

- Frontend: Next.js 15, TypeScript, Tailwind CSS
- Backend: Java 17, Spring Boot 3.1.x, Maven
- Database: PostgreSQL, Flyway
- API docs: OpenAPI / Swagger UI

## Project Structure

```text
apps/
  backend/    Spring Boot REST API
  frontend/   Next.js web application
compose.yaml  Local PostgreSQL database
```

## Quick Start

### Prerequisites

- Node.js LTS
- npm
- Java 17
- Maven
- Docker Desktop or Docker Engine

### Database

```bash
docker compose up -d db
```

### Backend

```bash
cd apps/backend
mvn spring-boot:run
```

Backend runs at <http://localhost:8080>.
Swagger UI runs at <http://localhost:8080/swagger-ui/index.html>.

### Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

Frontend runs at <http://localhost:3000>.

## Version 1 Scope

- Project skeleton for frontend and backend
- Health endpoint
- Mobile-first landing dashboard mockup
- Initial Flyway schema for users, products, warehouses, locations, inventory, requests, and audit events
- Local PostgreSQL development setup
