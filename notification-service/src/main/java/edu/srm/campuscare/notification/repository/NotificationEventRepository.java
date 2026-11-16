package edu.srm.campuscare.notification.repository;
import edu.srm.campuscare.notification.entity.NotificationEvent;
import org.springframework.data.jpa.repository.JpaRepository;
public interface NotificationEventRepository extends JpaRepository<NotificationEvent,Long> {}
