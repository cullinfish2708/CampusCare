package edu.srm.campuscare.notification;
import edu.srm.campuscare.notification.dto.NotificationCreateRequest;
import edu.srm.campuscare.notification.repository.NotificationEventRepository;
import edu.srm.campuscare.notification.service.NotificationEventService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest @ActiveProfiles("test")
class NotificationEventServiceTest {
 @Autowired NotificationEventService service; @Autowired NotificationEventRepository repo;
 @Test void persistsDemoNotificationEvent(){var saved=service.create(new NotificationCreateRequest("student@example.test","Ticket received","Your request has been logged.",42L,"TICKET_CREATED"));assertNotNull(saved.getId());assertEquals("DEMO_LOGGED",saved.getDeliveryStatus());assertEquals(1,repo.count());}
}
