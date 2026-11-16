package edu.srm.campuscare.service;

import edu.srm.campuscare.dto.*;
import edu.srm.campuscare.entity.*;
import edu.srm.campuscare.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class TicketService {
 private final TicketRepository tickets; private final TicketCommentRepository comments; private final TicketMapper mapper; private final NotificationClient notifier;
 public TicketService(TicketRepository tickets,TicketCommentRepository comments,TicketMapper mapper,NotificationClient notifier){this.tickets=tickets;this.comments=comments;this.mapper=mapper;this.notifier=notifier;}

 @Transactional(readOnly=true)
 public List<TicketResponse> list(String q,String status,String category){
  String query=q==null?"":q.trim().toLowerCase();
  return tickets.findAll(Sort.by(Sort.Direction.DESC,"createdAt")).stream()
   .filter(t->query.isBlank() || (t.getTitle()+" "+t.getTicketCode()+" "+t.getRequesterName()+" "+t.getLocation()).toLowerCase().contains(query))
   .filter(t->status==null || status.isBlank() || t.getStatus().name().equalsIgnoreCase(status))
   .filter(t->category==null || category.isBlank() || t.getCategory().name().equalsIgnoreCase(category))
   .map(t->mapper.toResponse(t)).toList();
 }

 @Transactional
 public TicketResponse create(TicketCreateRequest request){
  Ticket t=new Ticket(); t.setTitle(request.title().trim()); t.setDescription(request.description().trim()); t.setCategory(request.category()); t.setPriority(request.priority()); t.setStatus(TicketStatus.OPEN); t.setLocation(request.location().trim()); t.setRequesterName(request.requesterName().trim()); t.setRequesterEmail(request.requesterEmail().trim().toLowerCase()); t.setAssignedTeam("Campus Helpdesk");
  t.setTicketCode(generateCode()); t=tickets.save(t);
  notifier.dispatch(t.getRequesterEmail(),"CampusCare request received", "Your request "+t.getTicketCode()+" has been recorded.",t.getId(),"TICKET_CREATED");
  return mapper.toResponse(t);
 }
 @Transactional(readOnly=true) public TicketResponse get(Long id){return mapper.toResponse(tickets.findWithCommentsById(id).orElseThrow(()->new EntityNotFoundException("Ticket not found: "+id)));}
 @Transactional public TicketResponse update(Long id,TicketUpdateRequest request){
  Ticket t=tickets.findById(id).orElseThrow(()->new EntityNotFoundException("Ticket not found: "+id)); TicketStatus old=t.getStatus();
  t.setStatus(request.status()); t.setPriority(request.priority()); t.setAssignedTeam(request.assignedTeam().trim());
  if(request.status()==TicketStatus.RESOLVED || request.status()==TicketStatus.CLOSED){if(t.getResolvedAt()==null)t.setResolvedAt(Instant.now());} else t.setResolvedAt(null);
  t=tickets.save(t);
  if(old!=t.getStatus()) notifier.dispatch(t.getRequesterEmail(),"CampusCare status updated", "Your request "+t.getTicketCode()+" is now "+t.getStatus()+".",t.getId(),"STATUS_CHANGED");
  return mapper.toResponse(t);
 }
 @Transactional public void delete(Long id){if(!tickets.existsById(id))throw new EntityNotFoundException("Ticket not found: "+id);tickets.deleteById(id);}
 @Transactional public CommentResponse addComment(Long ticketId,CommentCreateRequest request){
  Ticket t=tickets.findById(ticketId).orElseThrow(()->new EntityNotFoundException("Ticket not found: "+ticketId));
  TicketComment c=new TicketComment(); c.setTicket(t);c.setAuthorName(request.authorName().trim());c.setContent(request.content().trim());c=comments.save(c);
  return new CommentResponse(c.getId(),c.getAuthorName(),c.getContent(),c.getCreatedAt(),c.getUpdatedAt());
 }
 @Transactional public CommentResponse updateComment(Long id,CommentUpdateRequest request){TicketComment c=comments.findById(id).orElseThrow(()->new EntityNotFoundException("Comment not found: "+id));c.setContent(request.content().trim());c=comments.save(c);return new CommentResponse(c.getId(),c.getAuthorName(),c.getContent(),c.getCreatedAt(),c.getUpdatedAt());}
 @Transactional public void deleteComment(Long id){if(!comments.existsById(id))throw new EntityNotFoundException("Comment not found: "+id);comments.deleteById(id);}
 @Transactional(readOnly=true) public DashboardSummary summary(){
  List<Ticket> all=tickets.findAll(); EnumMap<TicketCategory,Long> counts=all.stream().collect(Collectors.groupingBy(Ticket::getCategory,()->new EnumMap<>(TicketCategory.class),Collectors.counting()));
  Map<String,Long> byCategory=new LinkedHashMap<>(); for(TicketCategory c:TicketCategory.values())byCategory.put(c.name(),counts.getOrDefault(c,0L));
  return new DashboardSummary(all.size(),all.stream().filter(t->t.getStatus()==TicketStatus.OPEN).count(),all.stream().filter(t->t.getStatus()==TicketStatus.IN_PROGRESS).count(),all.stream().filter(t->t.getStatus()==TicketStatus.RESOLVED||t.getStatus()==TicketStatus.CLOSED).count(),all.stream().filter(t->t.getPriority()==TicketPriority.URGENT).count(),byCategory);
 }
 private String generateCode(){String code;do{code="CC-"+Instant.now().toEpochMilli()%10000000+"-"+ThreadLocalRandom.current().nextInt(100,999);}while(tickets.existsByTicketCode(code));return code;}
}
