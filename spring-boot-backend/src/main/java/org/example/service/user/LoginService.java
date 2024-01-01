package org.example.service.user;

import javax.naming.AuthenticationException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;

import org.example.model.user.User;

public interface LoginService {

    String login(User userToLogin) throws AuthenticationException;

    void logout(HttpServletRequest request);

}