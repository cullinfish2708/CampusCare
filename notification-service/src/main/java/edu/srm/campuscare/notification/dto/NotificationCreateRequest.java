package edu.srm.campuscare.notification.dto;
import jakarta.validation.constraints.*;
public record NotificationCreateRequest(@NotBlank @Email @Size(max=160) String recipient,@NotBlank @Size(max=160) String subject,@NotBlank @Size(max=1200) String message,@NotNull Long relatedTicketId,@NotBlank @Size(max=40) String eventType) {}
