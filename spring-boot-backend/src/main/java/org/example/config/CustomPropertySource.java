package org.example.config;

import org.springframework.core.env.PropertySource;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class CustomPropertySource extends PropertySource {
  public CustomPropertySource(String name, String url) {
    super(name);
    log.debug("init {} with url: {}", name, url);
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
