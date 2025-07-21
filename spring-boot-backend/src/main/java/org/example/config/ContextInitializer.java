package org.example.config;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

public class ContextInitializer implements ApplicationContextInitializer {
  @Override
  public void initialize(final ConfigurableApplicationContext context) {
    ConfigurableEnvironment environment = context.getEnvironment();
    String url = environment.getProperty("config.url", "");
    environment.getPropertySources().addLast(new CustomPropertySource("config", url));
  }
}
