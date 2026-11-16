package edu.srm.campuscare.dto;
import edu.srm.campuscare.entity.*;
import jakarta.validation.constraints.*;
public record TicketUpdateRequest(@NotNull TicketStatus status, @NotNull TicketPriority priority, @NotBlank @Size(max=100) String assignedTeam) {}
