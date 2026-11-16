package edu.srm.campuscare.notification.controller;
import edu.srm.campuscare.notification.dto.NotificationCreateRequest;
import edu.srm.campuscare.notification.entity.NotificationEvent;
import edu.srm.campuscare.notification.service.NotificationEventService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController public class NotificationController {
 private final NotificationEventService service;
 public NotificationController(NotificationEventService service){this.service=service;}
 @GetMapping("/health") public Map<String,String> health(){return Map.of("status","UP","service","campuscare-notification-service");}
 @PostMapping("/internal/notifications") public ResponseEntity<NotificationEvent> create(@Valid @RequestBody NotificationCreateRequest request){return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));}
 @GetMapping("/api/notifications") public List<NotificationEvent> list(){return service.list();}
}
