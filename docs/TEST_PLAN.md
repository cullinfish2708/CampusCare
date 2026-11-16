# Test plan and execution record

## Scope

Test the major business paths: request validation and persistence, search/filter, status/priority updates, comment CRUD, dashboard summary, and notification event persistence. Use only synthetic `.example.test` data.

## Automated tests included

| ID | Module | Scenario | Expected result |
|---|---|---|---|
| API-01 | Main API | Create a valid ticket | HTTP 201; ticket code and ID generated |
| API-02 | Main API | Submit blank title, too-short description and invalid email | HTTP 400; field-level validation map |
| API-03 | Main API | Add, edit and delete a comment | 201, 200 and 204 responses; details reflect deletion |
| NOTIF-01 | Notification service | Create notification event | Event persisted with `DEMO_LOGGED` status |

Run:

```bash
cd backend && mvn test
cd ../notification-service && mvn test
```

## Manual acceptance checklist

1. Frontend loads at the deployment base URL.
2. Dashboard shows totals consistent with `GET /api/dashboard/summary`.
3. Request form blocks missing/invalid fields before submission.
4. Valid submission creates a record visible in the list and details view.
5. Search matches title, requester, ticket code and location.
6. Status and category filters narrow the list correctly.
7. Staff update status/priority/assigned team and reload the page; changes persist.
8. Comment can be created, edited and deleted; ticket comment count updates.
9. Ticket deletion removes the associated comments.
10. Activity Log displays events recorded by the notification service.
11. A notification-service outage does not roll back a successfully stored ticket or status update.
12. Layout remains usable at desktop and mobile widths.

## Execution status at archive creation

Source files and test definitions are included. Java test execution and Docker builds have not been run because Maven and Docker are not installed in the preparation environment. Frontend dependency installation timed out, so the Vite build was not verified. Do not mark these test cases as passed until your team runs them and records the actual output here.

| Run date | Environment | Command | Result / evidence | Tested by |
|---|---|---|---|---|
| [Complete] | [Complete] | `mvn test` | [Complete] | [Complete] |
| [Complete] | [Complete] | `docker compose up --build` | [Complete] | [Complete] |
