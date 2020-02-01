package org.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({ SeleniumConfig.class })
public class IntegrationTestConfig {

}
