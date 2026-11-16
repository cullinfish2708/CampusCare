package edu.srm.campuscare.controller;
import edu.srm.campuscare.dto.*;
import edu.srm.campuscare.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api")
public class TicketController {
 private final TicketService service;
 public TicketController(TicketService service){this.service=service;}
 @GetMapping("/health") public java.util.Map<String,String> health(){return java.util.Map.of("status","UP","service","campuscare-api");}
 @GetMapping("/tickets") public List<TicketResponse> list(@RequestParam(required=false) String q,@RequestParam(required=false) String status,@RequestParam(required=false) String category){return service.list(q,status,category);}
 @PostMapping("/tickets") public ResponseEntity<TicketResponse> create(@Valid @RequestBody TicketCreateRequest body){return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));}
 @GetMapping("/tickets/{id}") public TicketResponse get(@PathVariable Long id){return service.get(id);}
 @PutMapping("/tickets/{id}") public TicketResponse update(@PathVariable Long id,@Valid @RequestBody TicketUpdateRequest body){return service.update(id,body);}
 @DeleteMapping("/tickets/{id}") public ResponseEntity<Void> delete(@PathVariable Long id){service.delete(id);return ResponseEntity.noContent().build();}
 @PostMapping("/tickets/{id}/comments") public ResponseEntity<CommentResponse> addComment(@PathVariable Long id,@Valid @RequestBody CommentCreateRequest body){return ResponseEntity.status(HttpStatus.CREATED).body(service.addComment(id,body));}
 @PutMapping("/comments/{id}") public CommentResponse editComment(@PathVariable Long id,@Valid @RequestBody CommentUpdateRequest body){return service.updateComment(id,body);}
 @DeleteMapping("/comments/{id}") public ResponseEntity<Void> deleteComment(@PathVariable Long id){service.deleteComment(id);return ResponseEntity.noContent().build();}
 @GetMapping("/dashboard/summary") public DashboardSummary summary(){return service.summary();}
}
