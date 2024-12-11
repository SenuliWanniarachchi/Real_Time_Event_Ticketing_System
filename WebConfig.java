package com.java.Coursework01.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // This annotation makes it a configuration class for Spring
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow cross-origin requests from the frontend on port 3000 (React default)
        registry.addMapping("/api/**")  // This pattern matches all the backend API endpoints
                .allowedOrigins("http://localhost:3000") // Frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // Allowed HTTP methods
                .allowedHeaders("*"); // Allowed headers from frontend
    }
}
