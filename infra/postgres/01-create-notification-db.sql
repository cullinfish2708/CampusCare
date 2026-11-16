SELECT 'CREATE DATABASE campuscare_notifications'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'campuscare_notifications')\gexec
GRANT ALL PRIVILEGES ON DATABASE campuscare_notifications TO campuscare;
