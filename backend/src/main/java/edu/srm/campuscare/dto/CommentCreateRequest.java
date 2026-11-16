package edu.srm.campuscare.dto;
import jakarta.validation.constraints.*;
public record CommentCreateRequest(@NotBlank @Size(max=100) String authorName, @NotBlank @Size(min=2,max=1500) String content) {}
