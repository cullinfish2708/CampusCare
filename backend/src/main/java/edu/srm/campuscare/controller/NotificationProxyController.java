package edu.srm.campuscare.controller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
@RestController @RequestMapping("/api/notifications")
public class NotificationProxyController {
 private final RestClient client; private final String baseUrl;
 public NotificationProxyController(RestClient.Builder builder,@Value("${app.notification-service-url:http://localhost:8081}") String baseUrl){this.client=builder.build();this.baseUrl=baseUrl;}
 @GetMapping public Object list(){return client.get().uri(baseUrl+"/api/notifications").retrieve().body(Object.class);}
}
