package edu.srm.campuscare.dto;
import java.time.Instant;
public record CommentResponse(Long id, String authorName, String content, Instant createdAt, Instant updatedAt) {}
