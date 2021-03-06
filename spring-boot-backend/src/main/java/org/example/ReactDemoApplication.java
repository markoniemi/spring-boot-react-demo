package org.example;

import org.example.config.ApplicationConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
public class ReactDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApplicationConfig.class, args);
    }
}
