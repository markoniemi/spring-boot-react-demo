package org.example.config;

import org.example.security.JwtToken;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.client.ClientHttpRequestInterceptor;

import feign.RequestInterceptor;

@Configuration
@Import({SeleniumConfig.class})
public class IntegrationTestConfig {

  @Bean
  public RequestInterceptor jwtRequestInterceptor() {
    return new JwtRequestInterceptor(JwtToken.create("admin"));
  }

  @Bean
  public ClientHttpRequestInterceptor restRequestInterceptor() {
    return new RestRequestInterceptor(JwtToken.create("admin"));
  }
}
