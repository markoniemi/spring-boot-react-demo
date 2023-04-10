package org.example.service.user;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.example.model.user.User;

public interface LoginService {

    String login(User userToLogin) throws AuthenticationException;

    void logout(HttpServletRequest request);

}