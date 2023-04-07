package org.example.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    public JwtAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(getToken(request));
        if (authenticationToken!=null) {
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        chain.doFilter(request, response);
    }

    private String getToken(HttpServletRequest request) {
        String header = request.getHeader(JwtToken.AUTHORIZATION_HEADER);
        if (!JwtToken.hasToken(header)) {
            logger.debug("No token in Authorization header.");
            return null;
        }
        return header.replace(JwtToken.TOKEN_PREFIX, "");
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if (StringUtils.isBlank(token)) {
            return null;
        }
        String user = JwtToken.verifyToken(token);
        if (StringUtils.isBlank(user)) {
            return null;
        }
        return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
    }
}