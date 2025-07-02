package org.example.security;

import static org.apache.commons.lang3.StringUtils.EMPTY;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

  public JwtAuthorizationFilter(AuthenticationManager authManager) {
    super(authManager);
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    SecurityContextHolder.getContext().setAuthentication(getAuthentication(getToken(request)));
    chain.doFilter(request, response);
  }

  protected String getToken(HttpServletRequest request) {
    return StringUtils.replace(
        request.getHeader(JwtToken.AUTHORIZATION_HEADER), JwtToken.TOKEN_PREFIX, EMPTY);
  }

  private UsernamePasswordAuthenticationToken getAuthentication(String token) {
    if (isBlank(token)) {
      log.debug("No token in Authorization header.");
      return null;
    }
    JwtToken.verify(token);
    String user = JwtToken.getSubject(token);
    if (isBlank(user)) {
      return null;
    }
    return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
  }
}
