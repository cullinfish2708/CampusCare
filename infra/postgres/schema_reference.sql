-- Reference DDL. In the application, Hibernate JPA creates/updates these tables in the configured database.
CREATE TABLE IF NOT EXISTS tickets (
  id BIGSERIAL PRIMARY KEY,
  ticket_code VARCHAR(24) NOT NULL UNIQUE,
  title VARCHAR(120) NOT NULL,
  description VARCHAR(3000) NOT NULL,
  category VARCHAR(24) NOT NULL,
  priority VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
  location VARCHAR(140) NOT NULL,
  requester_name VARCHAR(100) NOT NULL,
  requester_email VARCHAR(160) NOT NULL,
  assigned_team VARCHAR(100) NOT NULL DEFAULT 'Campus Helpdesk',
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  resolved_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_ticket_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_ticket_created ON tickets(created_at);
CREATE TABLE IF NOT EXISTS ticket_comments (
  id BIGSERIAL PRIMARY KEY,
  ticket_id BIGINT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  content VARCHAR(1500) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_comment_ticket ON ticket_comments(ticket_id);

-- Run this DDL in the separate campuscare_notifications database:
CREATE TABLE IF NOT EXISTS notification_events (
  id BIGSERIAL PRIMARY KEY,
  recipient VARCHAR(160) NOT NULL,
  subject VARCHAR(160) NOT NULL,
  message VARCHAR(1200) NOT NULL,
  related_ticket_id BIGINT NOT NULL,
  event_type VARCHAR(40) NOT NULL,
  delivery_status VARCHAR(40) NOT NULL DEFAULT 'DEMO_LOGGED',
  created_at TIMESTAMPTZ NOT NULL
);
