package org.example.config;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.PropertySource;
import lombok.extern.log4j.Log4j2;
@Log4j2
public class ContextInitializer implements ApplicationContextInitializer {
  @Override
  public void initialize(final ConfigurableApplicationContext context) {
    log.debug("ContextInitializer.initialize");
    ConfigurableEnvironment environment = context.getEnvironment();
    MutablePropertySources propertySources = environment.getPropertySources();
    PropertySource propertySource = new CustomPropertiesPropertySource("config");
    propertySources.addLast(propertySource);
//    propertySources.addFirst(propertySource);
  }
}