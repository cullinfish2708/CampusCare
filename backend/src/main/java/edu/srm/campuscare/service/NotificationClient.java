package edu.srm.campuscare.service;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import java.util.Map;
@Component
public class NotificationClient {
 private static final Logger log=LoggerFactory.getLogger(NotificationClient.class);
 private final RestClient client; private final String baseUrl;
 public NotificationClient(RestClient notificationRestClient,@Value("${app.notification-service-url:http://localhost:8081}") String baseUrl){this.client=notificationRestClient;this.baseUrl=baseUrl;}
 public void dispatch(String recipient,String subject,String message,Long ticketId,String eventType){
  try { client.post().uri(baseUrl+"/internal/notifications").body(Map.of("recipient",recipient,"subject",subject,"message",message,"relatedTicketId",ticketId,"eventType",eventType)).retrieve().toBodilessEntity(); }
  catch(Exception ex){ log.warn("Notification service unavailable; ticket workflow remains saved. ticketId={}, reason={}",ticketId,ex.getMessage()); }
 }
}
