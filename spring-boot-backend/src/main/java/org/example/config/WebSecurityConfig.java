package org.example.config;

import org.example.security.JwtAuthenticationFilter;
import org.example.security.JwtAuthorizationFilter;
import org.example.security.UserRepositoryAuthenticationProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import jakarta.annotation.Resource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
  @Resource
  UserRepositoryAuthenticationProvider userRepositoryAuthenticationProvider;
  @Resource
  UserDetailsService userDetailsService;
  AuthenticationManager authenticationManager;
  String[] ignoredPaths =
      {"/*", "/login", "/api/rest/auth/login/**", "/h2-console/**", "/users/**"};

  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http,
      UserDetailsService userDetailsService) throws Exception {
    authenticationManager = http.getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(userDetailsService).passwordEncoder(NoOpPasswordEncoder.getInstance())
        .and().build();
    return authenticationManager;
  }

  @DependsOn("authenticationManager")
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable() //
        .authorizeRequests().requestMatchers(RegexRequestMatcher.regexMatcher(".*\\?wsdl"))
        .permitAll()//
        .requestMatchers(ignoredPaths).anonymous()//
        .anyRequest().authenticated()//
        .and()//
        .addFilter(new JwtAuthenticationFilter(authenticationManager))
        .addFilter(new JwtAuthorizationFilter(authenticationManager)).sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    return http.build();
  }
}
