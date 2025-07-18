package org.example.config;

import org.springframework.core.env.PropertySource;
import lombok.extern.log4j.Log4j2;
@Log4j2
public class CustomPropertiesPropertySource extends PropertySource {
  public CustomPropertiesPropertySource(String name) {
    super(name);
    log.debug("CustomPropertiesPropertySource: {}", name);
  }

  @Override
  public Object getProperty(String key) {
    if (key.startsWith("config")) {
      log.debug("getProperty: {}", key);
      return "test";
    }
    return null;
  }
}
