package edu.srm.campuscare.notification.service;
import edu.srm.campuscare.notification.dto.NotificationCreateRequest;
import edu.srm.campuscare.notification.entity.NotificationEvent;
import edu.srm.campuscare.notification.repository.NotificationEventRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
@Service public class NotificationEventService {
 private final NotificationEventRepository repo;
 public NotificationEventService(NotificationEventRepository repo){this.repo=repo;}
 public NotificationEvent create(NotificationCreateRequest r){NotificationEvent e=new NotificationEvent();e.setRecipient(r.recipient());e.setSubject(r.subject());e.setMessage(r.message());e.setRelatedTicketId(r.relatedTicketId());e.setEventType(r.eventType());e.setDeliveryStatus("DEMO_LOGGED");return repo.save(e);}
 public List<NotificationEvent> list(){return repo.findAll(Sort.by(Sort.Direction.DESC,"createdAt"));}
}
