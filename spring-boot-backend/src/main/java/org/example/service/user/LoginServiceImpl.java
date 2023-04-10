package org.example.service.user;

import javax.annotation.Resource;
import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.example.model.user.User;
import org.example.security.JwtToken;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Produces({ MediaType.APPLICATION_JSON })
@Component(value = "loginService")
@Path("/auth")
public class LoginServiceImpl implements LoginService {
    @Resource
    @Getter
    @Setter
//    private UserService userService = new UserServiceImpl();
    private UserService userService;

    @Override
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    public String login(User userToLogin) throws AuthenticationException {
        User user = userService.findByUsername(userToLogin.getUsername());
        if (user == null) {
            throw new AuthenticationException("Login error");
        }
        if (user.getPassword().equals(userToLogin.getPassword())) {
            log.debug("Username: {} logged in.", user.getUsername());
            return JwtToken.createToken(user.getUsername());
        } else {
            throw new AuthenticationException("Login error");
        }
    }

    @Override
    @POST
    @Path("/logout")
    public void logout(@Context HttpServletRequest request) {
        String authenticationToken = (String) request.getHeader(JwtToken.AUTHORIZATION_HEADER);
        log.debug(authenticationToken);
    }
}
