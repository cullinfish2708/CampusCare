# User workflow and acceptance criteria

## Requester journey

1. Open CampusCare and review the overview dashboard.
2. Choose **Submit request**.
3. Enter issue title, detailed description, category, priority, location, requester name and campus email.
4. Client-side checks run before the request is sent. The Spring Boot API repeats validation on the server.
5. The API stores the ticket in PostgreSQL and asks the notification service to log a `TICKET_CREATED` event.
6. The requester is redirected to the newly created ticket details, where the unique reference code is shown.
7. The requester may review status and participate in the comment timeline.

## Helpdesk workflow

1. Open **All requests**.
2. Search by code, title, requester or location; narrow the list by status and category.
3. Open a request and review the description and location.
4. Change status, priority or assigned team and save.
5. Add a comment explaining the action taken.
6. When status changes, the main API sends a best-effort event to the separate notification service. The Activity Log reads the notification service through the main API proxy.
7. Resolved/closed records are counted in the dashboard summary.

## Acceptance criteria

- A valid request receives a generated reference code and is persisted.
- Invalid requests produce understandable field errors.
- Requesters and staff can identify the latest status.
- A ticket can have multiple comments; a ticket deletion cascades to its comments.
- Search and filters can be combined.
- Dashboard counters are calculated from persisted ticket records.
- Notification activity is isolated behind a separate API and database.
