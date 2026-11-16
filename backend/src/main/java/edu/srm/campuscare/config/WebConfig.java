package edu.srm.campuscare.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;
@Configuration
public class WebConfig implements WebMvcConfigurer {
 @Value("${app.frontend-origin:http://localhost:5173}") private String frontendOrigin;
 @Override public void addCorsMappings(CorsRegistry registry){
  registry.addMapping("/api/**").allowedOrigins(frontendOrigin,"http://localhost:5173","http://localhost:8088").allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS").allowedHeaders("*");
 }
}
