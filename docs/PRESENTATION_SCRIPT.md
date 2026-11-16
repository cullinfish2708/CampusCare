# Suggested 5-minute presentation script

Adjust the speaker names and timing to match the actual team. Every member should be able to answer questions about the complete system.

## Slide 1 - Introduction (25 seconds)
"Good morning. Our Task 4 project is CampusCare, a Campus Helpdesk and Maintenance Request System. We selected the campus helpdesk problem statement. The goal is to make it easier to submit campus issues, follow their progress and give support staff a consolidated view of the queue."

## Slide 2 - Problem (35 seconds)
"In a manual process, students may report issues through paper registers, spreadsheets or messages. That fragments the record. A requester may not know the current status, and staff may struggle to prioritise urgent issues or summarise the workload. CampusCare brings that workflow into one system."

## Slide 3 - Workflow (40 seconds)
"A requester submits the title, description, category, priority, location and contact details. The React form checks the data, and the Spring Boot API validates it again. The API stores a ticket and generates a reference code. Staff can then manage it, add comments and update the status."

## Slide 4 - Frontend views (35 seconds)
"The frontend has five views: Overview, All Requests, Submit Request, Request Details and Activity Log. Users can search by title, ticket code, person or location, and filter by status and category. On the details page, ticket updates and comments are managed together."

## Slide 5 - Architecture (45 seconds)
"The frontend is built with React and Vite. The main backend is a layered Spring Boot REST API with controllers, services, entities and repositories. PostgreSQL stores tickets and comments. A separate Spring Boot notification service has its own API and database. The main API calls it when a ticket is created or its status changes."

## Slide 6 - Database (35 seconds)
"The primary relational entities are Ticket and TicketComment. One ticket can have many comments, and each comment belongs to one ticket. The foreign key and JPA relationship maintain that connection. Notification events are stored separately by the notification service."

## Slide 7 - Testing and deployment (45 seconds)
"The project includes tests for valid ticket creation, invalid request validation, comment create/edit/delete and notification persistence. The full stack can be started using Docker Compose, which brings up PostgreSQL, both Spring Boot services and an Nginx frontend. We will show actual test and deployment output after running it in our environment."

## Slide 8 - Outcomes and closing (25 seconds)
"CampusCare demonstrates the course outcomes: responsive HTML and CSS, JavaScript and React, relational CRUD and persistence, Spring Boot layered architecture, and a separate service/API integration. Our next steps are to complete faculty approval, add the team contribution details, verify deployment and capture genuine screenshots. Thank you."

## Live demonstration sequence (2-3 minutes after the slides, if time permits)

1. Open the deployed or local app and show the Overview dashboard.
2. Open Submit Request and create a synthetic issue using an `example.test` email.
3. Open All Requests, search for the new request and use a status/category filter.
4. Open the request, change its status and assigned team, then add a comment.
5. Open Activity Log and show the `DEMO_LOGGED` notification event.
6. Refresh the ticket page and confirm that the status/comment persist.

## Questions the team should prepare for

- Why was PostgreSQL selected? It is a relational database suitable for the ticket/comment foreign-key relationship and structured queries.
- Why validate on both frontend and backend? Frontend validation improves usability; backend validation is the authoritative protection for API requests.
- Why use a separate notification service? It demonstrates a service/API boundary and isolates notification event logging from ticket business logic.
- What happens if the notification service is unavailable? The main API logs a warning and keeps the ticket operation; notification dispatch is best-effort.
- Does the notification service send emails? No. It records demo events only. Real delivery requires an approved provider and secure credentials.
- Is authentication implemented? No. This academic prototype uses open demo endpoints. SSO, role-based access and ownership checks are mandatory before real campus use.
