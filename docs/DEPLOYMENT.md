# Deployment and reproducible setup

## 1. Preferred: Docker Compose

This deployment starts four containers: PostgreSQL, the main CampusCare API, the independent notification service, and the Nginx-served React frontend. Both databases are created inside the PostgreSQL container (`campuscare_db` and `campuscare_notifications`).

### Prerequisites

- Docker Desktop / Docker Engine with Compose plugin.
- At least 4 GB RAM available for the first build.
- TCP port 8088 available on the host.

### Configure

```bash
cp .env.example .env
```

Replace the demo password in `.env` for non-local environments. The same database credentials are used for both database names by the compose setup. Do not commit `.env`.

### Start and validate

```bash
docker compose up --build -d
docker compose ps
```

Open `http://localhost:8088`. Check service health:

```bash
curl http://localhost:8088/api/health
curl http://localhost:8088/api/dashboard/summary
```

The API also has its direct internal host mapping at `http://localhost:8080` only if port mapping is added; the compose file intentionally publishes only the frontend. To inspect backend logs:

```bash
docker compose logs -f backend notification-service
```

Stop the stack:

```bash
docker compose down
```

Remove persisted demo database data (destructive):

```bash
docker compose down -v
```

### First-run database note

The `01-create-notification-db.sql` script executes only when the PostgreSQL data volume is first initialised. If an existing volume was created before adding that script, create the second database manually:

```bash
docker compose exec db psql -U campuscare -d campuscare_db -c "CREATE DATABASE campuscare_notifications;"
```

If it already exists, PostgreSQL will report that fact; do not repeat creation.

## 2. Manual development run

Use Java 21, Maven 3.6.3+, Node.js 22.12+ (or 20.19+) and PostgreSQL 16. Create the two databases and export the following variables for each application:

**Main API** (run from `backend/`):

```bash
DB_URL=jdbc:postgresql://localhost:5432/campuscare_db
DB_USERNAME=campuscare
DB_PASSWORD=your-password
NOTIFICATION_SERVICE_URL=http://localhost:8081
FRONTEND_ORIGIN=http://localhost:5173
mvn spring-boot:run
```

**Notification service** (run from `notification-service/`):

```bash
DB_URL=jdbc:postgresql://localhost:5432/campuscare_notifications
DB_USERNAME=campuscare
DB_PASSWORD=your-password
mvn spring-boot:run
```

**Frontend** (run from `frontend/`):

```bash
npm install
npm run dev
```

The Vite development proxy forwards `/api` to `http://localhost:8080` and `/notifications/api/notifications` to `http://localhost:8081/api/notifications`.

## 3. Public deployment topology

Use a private network between the API and notification service. Provision the following separately on a cloud provider that supports Docker containers and PostgreSQL:

| Component | Build / runtime | Required configuration |
|---|---|---|
| Frontend | `frontend/Dockerfile`, port 80 | Nginx upstreams `backend` and `notification-service`; public URL |
| Main API | `backend/Dockerfile`, port 8080 | `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `NOTIFICATION_SERVICE_URL`, `FRONTEND_ORIGIN` |
| Notification service | `notification-service/Dockerfile`, port 8081 | `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`; keep internal |
| Database A | PostgreSQL 16 | `campuscare_db` |
| Database B | PostgreSQL 16 | `campuscare_notifications` |

The supplied Nginx config assumes the service hostnames `backend` and `notification-service` resolve in the container network. If the provider assigns different private service names, replace the upstream names in `frontend/nginx.conf` and rebuild the frontend image. Configure `FRONTEND_ORIGIN` to the exact deployed frontend origin.

### Build commands

```bash
docker build -t campuscare-api ./backend
docker build -t campuscare-notification ./notification-service
docker build -t campuscare-frontend ./frontend
```

Set the database URLs to the provider's private connection strings. Keep database services private; do not publish port 5432 publicly. Put passwords in the provider's secret settings, not in Git.

## 4. Production hardening still required

This academic prototype deliberately keeps its UI/API simple. Before use with real students or staff:

- Add SRM SSO or another approved identity provider and role-based authorisation (requester, helpdesk staff, administrator).
- Enforce ownership/role checks for viewing, editing and deleting tickets/comments.
- Protect the internal notification endpoint with service credentials or private network policy.
- Replace demo notification logging with an approved email/SMS provider only after obtaining consent and configuring secrets.
- Configure HTTPS, database backups, retention policy, rate limiting, audit logging and monitoring.
- Replace Hibernate `ddl-auto=update` with reviewed migration scripts (Flyway/Liquibase) for controlled production schema evolution.
- Review data privacy and faculty approval before importing any real campus information.

## 5. Deployment evidence checklist

Capture genuine screenshots after deployment: container/service status, frontend home, request submission success, status update, activity log, API health response, database records, and test output. The screenshots in the report are conceptual diagrams/wireframes, not evidence of a cloud deployment. Add the real deployed URL and date only after a successful deployment.
