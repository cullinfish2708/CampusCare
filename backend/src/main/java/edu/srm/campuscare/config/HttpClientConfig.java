package edu.srm.campuscare.config;
import org.springframework.context.annotation.*;
import org.springframework.web.client.RestClient;
@Configuration
public class HttpClientConfig {
 @Bean RestClient notificationRestClient(RestClient.Builder builder){ return builder.build(); }
}
