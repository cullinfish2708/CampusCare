package edu.srm.campuscare.service;
import edu.srm.campuscare.dto.*;
import edu.srm.campuscare.entity.*;
import java.util.List;
import org.springframework.stereotype.Component;
@Component
public class TicketMapper {
 public TicketResponse toResponse(Ticket t){
  List<CommentResponse> comments=t.getComments().stream().map(c->new CommentResponse(c.getId(),c.getAuthorName(),c.getContent(),c.getCreatedAt(),c.getUpdatedAt())).toList();
  return new TicketResponse(t.getId(),t.getTicketCode(),t.getTitle(),t.getDescription(),t.getCategory(),t.getPriority(),t.getStatus(),t.getLocation(),t.getRequesterName(),t.getRequesterEmail(),t.getAssignedTeam(),t.getCreatedAt(),t.getUpdatedAt(),t.getResolvedAt(),comments.size(),comments);
 }
}
