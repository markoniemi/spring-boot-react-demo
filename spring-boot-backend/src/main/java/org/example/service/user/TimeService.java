package org.example.service.user;

import java.util.Date;

import javax.jws.WebParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.springframework.stereotype.Component;

@Component(value = "timeService")
@Path("/time")
public class TimeService {
    @POST
    public String getTime(@WebParam(name = "name") String name) {
        return String.format("%s", new Date());
    }
}
