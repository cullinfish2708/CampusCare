# CampusCare API reference

Base URL during local development: `http://localhost:8080`  
All JSON request bodies use `Content-Type: application/json`. The API validates request data and returns HTTP 400 with a `fields` map when a constraint fails.

## Health and dashboard

### `GET /api/health`

Example response:

```json
{"status":"UP","service":"campuscare-api"}
```

### `GET /api/dashboard/summary`

Returns request counts and category distribution:

```json
{"total":4,"open":2,"inProgress":1,"resolved":1,"urgent":1,"byCategory":{"IT_SUPPORT":1,"ELECTRICAL":1,"PLUMBING":1,"CLASSROOM":1,"HOSTEL":0,"CLEANLINESS":0,"OTHER":0}}
```

## Tickets

### `GET /api/tickets?q=wifi&status=OPEN&category=IT_SUPPORT`

All query parameters are optional. `q` searches title, code, requester name and location. `status`: `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`. `category`: `IT_SUPPORT`, `ELECTRICAL`, `PLUMBING`, `CLASSROOM`, `HOSTEL`, `CLEANLINESS`, `OTHER`.

### `POST /api/tickets`

```json
{
  "title": "Wi-Fi unavailable in Lab 3",
  "description": "The Wi-Fi connection disconnects repeatedly during class. This started this morning.",
  "category": "IT_SUPPORT",
  "priority": "HIGH",
  "location": "CSE Block, Lab 3",
  "requesterName": "Demo Student",
  "requesterEmail": "student@example.test"
}
```

Returns HTTP 201 and a `TicketResponse` with generated `id`, `ticketCode`, initial `OPEN` status, timestamps, and empty comments array.

### `GET /api/tickets/{id}`

Returns one ticket with its comments. Unknown identifiers return 404.

### `PUT /api/tickets/{id}`

```json
{"status":"IN_PROGRESS","priority":"HIGH","assignedTeam":"IT Support Desk"}
```

Changing status triggers a best-effort call to the independent notification service. If that service is offline, the ticket update remains saved; the main API logs a warning.

### `DELETE /api/tickets/{id}`

Deletes a ticket and its comments through the JPA cascade/orphan-removal relationship. Returns 204.


## SQL/JDBC reporting endpoints

### `GET /api/reports/category-summary`

Uses `JdbcTemplate` to execute a SQL `GROUP BY` query and return ticket totals/open counts per category.

### `GET /api/reports/tickets/{id}`

Uses a SQL `LEFT JOIN` between `tickets` and `ticket_comments` and returns one row with the related comment count. Unknown ticket IDs return 404.

## Related entity: comments

### `POST /api/tickets/{id}/comments`

```json
{"authorName":"Helpdesk Team","content":"A technician has been assigned to inspect the network point."}
```

Returns 201 and a comment record.

### `PUT /api/comments/{commentId}`

```json
{"content":"Technician will inspect the network point after 2 PM."}
```

### `DELETE /api/comments/{commentId}`

Returns 204.

## Notification service boundary

The main API proxies `GET /api/notifications` to the notification service for the frontend. The independent service also exposes these direct endpoints (normally internal):

- `GET http://localhost:8081/health`
- `POST http://localhost:8081/internal/notifications`
- `GET http://localhost:8081/api/notifications`

Internal creation example:

```json
{
  "recipient":"student@example.test",
  "subject":"CampusCare request received",
  "message":"Your request CC-123456-456 has been recorded.",
  "relatedTicketId":42,
  "eventType":"TICKET_CREATED"
}
```

The service stores events with `deliveryStatus: DEMO_LOGGED`. It does **not** send email or SMS. In a real deployment, restrict the internal endpoint to trusted network callers and add authentication/authorization.

## Validation and error format

Example response for invalid fields (HTTP 400):

```json
{
  "timestamp":"2026-11-16T04:30:00Z",
  "status":400,
  "error":"Validation failed",
  "message":"Please correct the highlighted fields.",
  "fields":{"title":"must not be blank","requesterEmail":"must be a well-formed email address"}
}
```

The `description` must contain 15-3000 characters; title is limited to 120 characters; email must be valid; category/priority/status must match the enum values. Comment content must contain 2-1500 characters.
