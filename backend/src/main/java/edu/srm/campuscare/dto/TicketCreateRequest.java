package edu.srm.campuscare.dto;
import edu.srm.campuscare.entity.*;
import jakarta.validation.constraints.*;
public record TicketCreateRequest(
 @NotBlank @Size(max=120) String title,
 @NotBlank @Size(min=15,max=3000) String description,
 @NotNull TicketCategory category,
 @NotNull TicketPriority priority,
 @NotBlank @Size(max=140) String location,
 @NotBlank @Size(max=100) String requesterName,
 @NotBlank @Email @Size(max=160) String requesterEmail
) {}
