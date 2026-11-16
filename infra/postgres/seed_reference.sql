-- Synthetic demo records only. The Spring Boot DemoDataSeeder also inserts four demo tickets on a fresh database.
INSERT INTO tickets (ticket_code,title,description,category,priority,status,location,requester_name,requester_email,assigned_team,created_at,updated_at)
VALUES ('CC-SEED-001','Wi-Fi drops near library','Demo issue: wireless access point disconnects in this area.','IT_SUPPORT','HIGH','OPEN','Central Library - Floor 2','Aarav Kumar','aarav.demo@example.test','Campus Helpdesk',NOW(),NOW())
ON CONFLICT (ticket_code) DO NOTHING;
