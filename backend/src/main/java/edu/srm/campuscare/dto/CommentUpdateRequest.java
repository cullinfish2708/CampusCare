package edu.srm.campuscare.dto;
import jakarta.validation.constraints.*;
public record CommentUpdateRequest(@NotBlank @Size(min=2,max=1500) String content) {}
