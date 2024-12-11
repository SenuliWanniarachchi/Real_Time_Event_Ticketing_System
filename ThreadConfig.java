package com.java.Coursework01.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Configuration
public class ThreadConfig {

    @Bean
    public Executor ticketExecutor() {
        return Executors.newFixedThreadPool(10); // Configure thread pool with 10 threads
    }
}
