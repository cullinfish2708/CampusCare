# SQL and JDBC evidence (CO-3)

The application uses Spring Data JPA for ticket/comment entity persistence and Spring JDBC `JdbcTemplate` for reporting queries. Spring Boot auto-configures a PostgreSQL `DataSource` from `DB_URL`, `DB_USERNAME` and `DB_PASSWORD`. `JdbcTemplate` obtains a JDBC `Connection`, creates a parameterised statement, reads the `ResultSet` through a `RowMapper`, and closes JDBC resources safely. The project therefore demonstrates JDBC connectivity while avoiding unsafe manual string concatenation.

## Implemented JDBC queries

**Category aggregation (GROUP BY):**

```sql
SELECT category,
       COUNT(*) AS total_tickets,
       SUM(CASE WHEN status = 'OPEN' THEN 1 ELSE 0 END) AS open_tickets
FROM tickets
GROUP BY category
ORDER BY category;
```

Endpoint: `GET /api/reports/category-summary`.

**Related-record query (LEFT JOIN):**

```sql
SELECT t.id, t.ticket_code, t.title, COUNT(c.id) AS comment_count
FROM tickets t
LEFT JOIN ticket_comments c ON c.ticket_id = t.id
WHERE t.id = ?
GROUP BY t.id, t.ticket_code, t.title;
```

Endpoint: `GET /api/reports/tickets/{id}`. The `?` placeholder is bound as a parameter; the query returns a ticket even if it has no comments.

## Representative CRUD and query statements

```sql
-- Create
INSERT INTO tickets (ticket_code, title, description, category, priority, status, location,
 requester_name, requester_email, assigned_team, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, 'OPEN', ?, ?, ?, 'Campus Helpdesk', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Read / filter
SELECT id, ticket_code, title, status, priority
FROM tickets WHERE status = 'OPEN' ORDER BY created_at DESC;

-- Update
UPDATE tickets SET status = 'IN_PROGRESS', updated_at = CURRENT_TIMESTAMP WHERE id = ?;

-- Delete (the related comments are removed through the foreign-key/JPA cascade)
DELETE FROM tickets WHERE id = ?;

-- Subquery example: tickets that have at least one comment
SELECT ticket_code, title FROM tickets
WHERE id IN (SELECT ticket_id FROM ticket_comments);

-- Set query example: open and in-progress work in one result set
SELECT ticket_code, status FROM tickets WHERE status = 'OPEN'
UNION ALL
SELECT ticket_code, status FROM tickets WHERE status = 'IN_PROGRESS';
```

The reference DDL is `infra/postgres/schema_reference.sql`. Hibernate creates/updates development tables from the JPA entities; the SQL file documents the expected relational model for review and manual database inspection.
