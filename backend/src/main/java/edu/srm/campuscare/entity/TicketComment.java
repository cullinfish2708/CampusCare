package edu.srm.campuscare.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name="ticket_comments", indexes=@Index(name="idx_comment_ticket", columnList="ticket_id"))
public class TicketComment {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false) @JoinColumn(name="ticket_id", nullable=false) private Ticket ticket;
    @Column(nullable=false, length=100) private String authorName;
    @Column(nullable=false, length=1500) private String content;
    @Column(nullable=false, updatable=false) private Instant createdAt;
    @Column(nullable=false) private Instant updatedAt;
    @PrePersist void onCreate(){createdAt=Instant.now(); updatedAt=createdAt;}
    @PreUpdate void onUpdate(){updatedAt=Instant.now();}
    public Long getId(){return id;} public void setId(Long v){id=v;}
    public Ticket getTicket(){return ticket;} public void setTicket(Ticket v){ticket=v;}
    public String getAuthorName(){return authorName;} public void setAuthorName(String v){authorName=v;}
    public String getContent(){return content;} public void setContent(String v){content=v;}
    public Instant getCreatedAt(){return createdAt;} public Instant getUpdatedAt(){return updatedAt;}
}
