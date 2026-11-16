package edu.srm.campuscare.notification.entity;
import jakarta.persistence.*;
import java.time.Instant;
@Entity @Table(name="notification_events")
public class NotificationEvent {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=160) private String recipient;
 @Column(nullable=false,length=160) private String subject;
 @Column(nullable=false,length=1200) private String message;
 @Column(nullable=false) private Long relatedTicketId;
 @Column(nullable=false,length=40) private String eventType;
 @Column(nullable=false,length=40) private String deliveryStatus="DEMO_LOGGED";
 @Column(nullable=false,updatable=false) private Instant createdAt;
 @PrePersist void onCreate(){createdAt=Instant.now();}
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getRecipient(){return recipient;} public void setRecipient(String v){recipient=v;}
 public String getSubject(){return subject;} public void setSubject(String v){subject=v;}
 public String getMessage(){return message;} public void setMessage(String v){message=v;}
 public Long getRelatedTicketId(){return relatedTicketId;} public void setRelatedTicketId(Long v){relatedTicketId=v;}
 public String getEventType(){return eventType;} public void setEventType(String v){eventType=v;}
 public String getDeliveryStatus(){return deliveryStatus;} public void setDeliveryStatus(String v){deliveryStatus=v;}
 public Instant getCreatedAt(){return createdAt;}
}
