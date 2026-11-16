# CampusCare - Campus Helpdesk and Maintenance Request System

**Course:** 21CSE354T - Full Stack Web Development  
**Assignment:** Task 4 - Team Project Assignment  
**Selected problem statement:** 1 - Campus Helpdesk and Maintenance Request System  
**Institution:** SRM Institute of Science and Technology, Tiruchirappalli Campus

CampusCare digitises campus facility and IT support requests. Students submit tickets, monitor their status, and communicate through comments. Helpdesk staff can search and filter requests, change priority/status, and maintain an auditable discussion timeline. A separate notification service records demo notification events through its own API and database.

> **Academic / deployment note:** This is a working project scaffold intended for team completion and faculty review. It uses synthetic seed records and a demo notification log; it does not send email/SMS and does not include production authentication. Obtain faculty approval for the chosen domain/scope, add the real team information, and configure access control before handling real campus data.

## Architecture

- `frontend/` - React 19 + Vite single-page application. Views: Overview, Requests, Submit Request, Request Details, and Activity Log.
- `backend/` - Spring Boot REST API. Layered controller/service/repository/domain architecture; PostgreSQL persistence for tickets and comments.
- `notification-service/` - Independent Spring Boot service and API. Persists notification events in a separate PostgreSQL database; called by the main API after ticket creation or status changes.
- `infra/` - Docker Compose, PostgreSQL initialisation, and Nginx reverse proxy.

## Requirements

- Docker Desktop with Docker Compose plugin (recommended one-command setup), or Java 21+, Maven 3.6.3+, Node.js 22.12+ and PostgreSQL 16+ for manual setup.
- Current Vite requires Node.js 20.19+ or 22.12+. Spring Boot 3.5.x requires Java 17+; this project targets Java 21.

## Run the complete stack with Docker

1. Extract the repository and open a terminal in the project root.
2. Copy environment defaults:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell: `Copy-Item .env.example .env`
3. Start all services:

   ```bash
   docker compose up --build
   ```
4. Open the frontend at `http://localhost:8088`.
5. API health (through the frontend reverse proxy): `http://localhost:8088/api/health`.
6. Check notification-service health with `docker compose ps` (the service is private to the compose network).

Stop with `docker compose down`. To remove local demo database volumes as well, use `docker compose down -v` (this deletes local persisted data).

## Run services separately (development)

### Database

Start PostgreSQL 16 and create databases `campuscare_db` and `campuscare_notifications`. Set environment variables from `.env.example` or use the defaults in the application configuration.

### Main API

```bash
cd backend
mvn spring-boot:run
```

Runs on `http://localhost:8080`.

### Notification service

```bash
cd notification-service
mvn spring-boot:run
```

Runs on `http://localhost:8081`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`. Vite proxies `/api` to port 8080 and `/notifications` to port 8081 (with the `/notifications` prefix removed before forwarding).

## Demo workflow

1. Open **Submit Request** and enter a requester name/email, category, location, priority, title and detailed description.
2. The API validates the request, saves the requester details as part of the ticket record, and returns a ticket code.
3. Open **Requests**, use search/status/category filters, and select a ticket.
4. On **Request Details**, update status/priority/assigned team and add/edit/delete comments.
5. Open **Activity Log** to see notification events persisted by the independent notification service.
6. Return to **Overview** to see live ticket counts and recent activity.

## API summary

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Main API health |
| GET | `/api/dashboard/summary` | Dashboard metrics (JPA) |
| GET | `/api/reports/category-summary` | SQL/JDBC category aggregation |
| GET | `/api/reports/tickets/{id}` | SQL LEFT JOIN ticket/comment summary |
| GET | `/api/tickets` | List/search/filter tickets (`q`, `status`, `category`) |
| POST | `/api/tickets` | Create a ticket |
| GET | `/api/tickets/{id}` | Ticket details and comments |
| PUT | `/api/tickets/{id}` | Update ticket status, priority and assigned team |
| DELETE | `/api/tickets/{id}` | Delete a ticket and its comments |
| POST | `/api/tickets/{id}/comments` | Add a comment |
| PUT | `/api/comments/{id}` | Edit a comment |
| DELETE | `/api/comments/{id}` | Delete a comment |
| GET | `/api/notifications` | Main API proxy to notification service |
| GET | `/api/notifications` (notification service) | List notification log events |
| POST | `/internal/notifications` | Internal notification event API |

For complete request/response examples, see [`docs/API.md`](docs/API.md).

## Data model

- `Ticket` has many `Comment` records (one-to-many relationship).
- Each comment belongs to exactly one ticket (many-to-one relationship).
- The notification service stores `NotificationEvent` records in a separate database.
- Ticket category, priority and status are constrained enums.

See [`docs/ER_DIAGRAM.svg`](docs/ER_DIAGRAM.svg), [`docs/ARCHITECTURE.svg`](docs/ARCHITECTURE.svg), and `infra/postgres/01-create-notification-db.sql`.

## Tests and build

```bash
cd backend && mvn test
cd ../notification-service && mvn test
cd ../frontend && npm install && npm run build
```

The backend tests cover ticket creation, request validation and comment CRUD. The notification-service test covers event persistence. The current preparation environment does not have Maven or Docker installed, and npm dependency installation timed out. Java compilation, the Vite production build, container startup and live deployment have **not** been executed here. Run the commands above on your system before claiming those checks passed.

## Deployment

The reproducible reference deployment is Docker Compose. For public hosting, provision:

1. PostgreSQL with two databases (`campuscare_db`, `campuscare_notifications`).
2. Main API container from `backend/Dockerfile` (port 8080).
3. Notification container from `notification-service/Dockerfile` (port 8081).
4. Frontend build from `frontend/Dockerfile` (Nginx port 80), with internal upstream URLs configured for the API and notification service.

Configure secrets through the hosting provider's secret manager. Never commit `.env`. See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for exact environment variables, build commands, health checks and hosting notes.

## Team details to complete

Before submission, replace the placeholders in `TEAM_DETAILS_TEMPLATE.md` and the report with the real members, register numbers, roles and individual contributions. Do not invent team members or claim faculty approval without evidence.
