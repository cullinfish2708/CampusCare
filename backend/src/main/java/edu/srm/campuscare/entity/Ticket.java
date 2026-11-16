package edu.srm.campuscare.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tickets", indexes = {@Index(name="idx_ticket_status", columnList="status"), @Index(name="idx_ticket_created", columnList="created_at")})
public class Ticket {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false, unique=true, length=24) private String ticketCode;
    @Column(nullable=false, length=120) private String title;
    @Column(nullable=false, length=3000) private String description;
    @Enumerated(EnumType.STRING) @Column(nullable=false, length=24) private TicketCategory category;
    @Enumerated(EnumType.STRING) @Column(nullable=false, length=20) private TicketPriority priority;
    @Enumerated(EnumType.STRING) @Column(nullable=false, length=20) private TicketStatus status = TicketStatus.OPEN;
    @Column(nullable=false, length=140) private String location;
    @Column(nullable=false, length=100) private String requesterName;
    @Column(nullable=false, length=160) private String requesterEmail;
    @Column(nullable=false, length=100) private String assignedTeam = "Campus Helpdesk";
    @Column(nullable=false, updatable=false) private Instant createdAt;
    @Column(nullable=false) private Instant updatedAt;
    private Instant resolvedAt;
    @OneToMany(mappedBy="ticket", cascade=CascadeType.ALL, orphanRemoval=true)
    @OrderBy("createdAt ASC")
    private List<TicketComment> comments = new ArrayList<>();

    @PrePersist void onCreate() { createdAt = Instant.now(); updatedAt = createdAt; }
    @PreUpdate void onUpdate() { updatedAt = Instant.now(); }

    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getTicketCode(){return ticketCode;} public void setTicketCode(String v){ticketCode=v;}
    public String getTitle(){return title;} public void setTitle(String v){title=v;}
    public String getDescription(){return description;} public void setDescription(String v){description=v;}
    public TicketCategory getCategory(){return category;} public void setCategory(TicketCategory v){category=v;}
    public TicketPriority getPriority(){return priority;} public void setPriority(TicketPriority v){priority=v;}
    public TicketStatus getStatus(){return status;} public void setStatus(TicketStatus v){status=v;}
    public String getLocation(){return location;} public void setLocation(String v){location=v;}
    public String getRequesterName(){return requesterName;} public void setRequesterName(String v){requesterName=v;}
    public String getRequesterEmail(){return requesterEmail;} public void setRequesterEmail(String v){requesterEmail=v;}
    public String getAssignedTeam(){return assignedTeam;} public void setAssignedTeam(String v){assignedTeam=v;}
    public Instant getCreatedAt(){return createdAt;} public Instant getUpdatedAt(){return updatedAt;}
    public Instant getResolvedAt(){return resolvedAt;} public void setResolvedAt(Instant v){resolvedAt=v;}
    public List<TicketComment> getComments(){return comments;} public void setComments(List<TicketComment> v){comments=v;}
}
