package com.java.Coursework01.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/**").permitAll()  // Allow public access to API
                        .anyRequest().authenticated()           // All other requests require authentication
                )
                .csrf(csrf -> csrf.disable())              // Disabling CSRF protection
                .httpBasic(httpBasic -> {});               // Enabling HTTP Basic authentication

        return http.build();
    }
}
