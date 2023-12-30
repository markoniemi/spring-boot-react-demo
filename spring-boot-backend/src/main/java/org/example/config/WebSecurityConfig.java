package org.example.config;

import javax.annotation.Resource;
import org.example.security.JwtAuthenticationFilter;
import org.example.security.JwtAuthorizationFilter;
import org.example.security.UserRepositoryAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.DependsOn;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class WebSecurityConfig {
  @Resource
  UserRepositoryAuthenticationProvider userRepositoryAuthenticationProvider;
  @Resource
  UserDetailsService userDetailsService;  
  AuthenticationManager authenticationManager;
  String[] ignoredPaths = {"/*", "/login", "/api/rest/auth/login/**", "/h2-console/**","/users/**"};
//  @Bean
//  public WebSecurityCustomizer webSecurityCustomizer() {
//      return (web) -> web
//        .ignoring()
//        .antMatchers(this.ignoredPaths);
//  }  
  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http,  UserDetailsService userDetailsService) 
    throws Exception {
      authenticationManager= http.getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(userDetailsService)
        .passwordEncoder(NoOpPasswordEncoder.getInstance())
        .and()
        .build();
      return authenticationManager;
  }
  @DependsOn("authenticationManager")
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http.cors().and().csrf().disable() //
        .authorizeRequests()
        .regexMatchers(".*\\?wsdl").permitAll()//        
        .antMatchers(ignoredPaths).anonymous()//
        .anyRequest().authenticated()
        .and()
        .addFilter(new JwtAuthenticationFilter(authenticationManager))
        .addFilter(new JwtAuthorizationFilter(authenticationManager))
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      return http.build();
  }

}
