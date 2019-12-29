package org.example.service.user;

import java.util.Date;

import javax.jws.WebParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

@Component(value = "helloService")
@Path("/hello")
public class HelloService {
    @POST
    public String hello(@WebParam(name = "name") String name) {
        return String.format("Hello %s, the time at the server is now %s\n", name, new Date());
    }

}
