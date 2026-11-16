package edu.srm.campuscare.config;
import edu.srm.campuscare.entity.*;
import edu.srm.campuscare.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import java.time.Instant;
@Configuration
public class DemoDataSeeder {
 @Bean CommandLineRunner seedDemoData(TicketRepository tickets,TicketCommentRepository comments){return args->{
  if(tickets.count()>0)return;
  String[][] rows={
   {"Wi-Fi drops near the central library","Connectivity issue affects access to course materials. Please inspect the access point on the second floor.","IT_SUPPORT","HIGH","Central Library - Floor 2","Aarav Kumar","aarav.demo@example.test","OPEN"},
   {"Projector not starting in Lab 204","The projector power indicator is on but no display is produced.","CLASSROOM","NORMAL","CSE Block - Lab 204","Meera S","meera.demo@example.test","IN_PROGRESS"},
   {"Water leakage outside Room B-12","Water is collecting near the corridor and needs inspection.","PLUMBING","URGENT","Hostel Block B - Corridor","Rohan P","rohan.demo@example.test","OPEN"},
   {"Tube light flickering in Seminar Hall","Two lights flicker during presentations.","ELECTRICAL","LOW","Main Block - Seminar Hall","Diya R","diya.demo@example.test","RESOLVED"}
  };
  int i=1; for(String[] r:rows){Ticket t=new Ticket();t.setTicketCode("CC-DEMO-"+(100+i++));t.setTitle(r[0]);t.setDescription(r[1]);t.setCategory(TicketCategory.valueOf(r[2]));t.setPriority(TicketPriority.valueOf(r[3]));t.setLocation(r[4]);t.setRequesterName(r[5]);t.setRequesterEmail(r[6]);t.setStatus(TicketStatus.valueOf(r[7]));t.setAssignedTeam("Facilities & IT Desk");if(t.getStatus()==TicketStatus.RESOLVED)t.setResolvedAt(Instant.now());t=tickets.save(t);TicketComment c=new TicketComment();c.setTicket(t);c.setAuthorName("Helpdesk Team");c.setContent(t.getStatus()==TicketStatus.RESOLVED?"Demo update: issue checked and marked resolved.":"Demo update: request received and added to the work queue.");comments.save(c);}
 };}
}
