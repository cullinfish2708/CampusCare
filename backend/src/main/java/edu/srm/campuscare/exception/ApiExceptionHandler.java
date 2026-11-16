package edu.srm.campuscare.exception;
import edu.srm.campuscare.dto.ApiError;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.*;
@RestControllerAdvice
public class ApiExceptionHandler {
 @ExceptionHandler(MethodArgumentNotValidException.class)
 public ResponseEntity<ApiError> validation(MethodArgumentNotValidException ex){Map<String,String> fields=new LinkedHashMap<>();ex.getBindingResult().getFieldErrors().forEach(e->fields.put(e.getField(),e.getDefaultMessage()));return ResponseEntity.badRequest().body(new ApiError(Instant.now(),400,"Validation failed","Please correct the highlighted fields.",fields));}
 @ExceptionHandler(EntityNotFoundException.class)
 public ResponseEntity<ApiError> notFound(EntityNotFoundException ex){return ResponseEntity.status(404).body(new ApiError(Instant.now(),404,"Not found",ex.getMessage(),Map.of()));}
 @ExceptionHandler(IllegalArgumentException.class)
 public ResponseEntity<ApiError> badRequest(IllegalArgumentException ex){return ResponseEntity.badRequest().body(new ApiError(Instant.now(),400,"Bad request",ex.getMessage(),Map.of()));}
 @ExceptionHandler(Exception.class)
 public ResponseEntity<ApiError> unexpected(Exception ex){return ResponseEntity.status(500).body(new ApiError(Instant.now(),500,"Internal server error","An unexpected server error occurred.",Map.of()));}
}
