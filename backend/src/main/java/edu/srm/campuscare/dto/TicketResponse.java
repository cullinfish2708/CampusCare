package edu.srm.campuscare.dto;
import edu.srm.campuscare.entity.*;
import java.time.Instant;
import java.util.List;
public record TicketResponse(Long id, String ticketCode, String title, String description, TicketCategory category, TicketPriority priority, TicketStatus status, String location, String requesterName, String requesterEmail, String assignedTeam, Instant createdAt, Instant updatedAt, Instant resolvedAt, int commentCount, List<CommentResponse> comments) {}
