package org.example.service.user;

import java.util.Date;

import jakarta.jws.WebParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

import org.springframework.stereotype.Component;

@Component(value = "timeService")
@Path("/time")
public class TimeService {
    @POST
    public String getTime(@WebParam(name = "name") String name) {
        return String.format("%s", new Date());
    }
}
