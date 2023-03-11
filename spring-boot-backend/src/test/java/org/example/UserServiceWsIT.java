package org.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.example.model.user.User;
import org.example.service.user.UserService;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

public class UserServiceWsIT extends AbstractIntegrationTestBase {
    @Test
    public void findAll() throws JsonParseException, JsonMappingException, IOException {
        UserService userService = getUserClient();
        List<User> users = userService.findAll();
        assertNotNull(users);
        assertEquals(6, users.size());
    }

    public UserService getUserClient() throws MalformedURLException {
        URL wsdlURL = new URL("http://localhost:8080/api/soap/users?wsdl");
        QName qname = new QName("http://user.service.example.org/", "UserService");
        Service service = Service.create(wsdlURL, qname);
        UserService port = service.getPort(UserService.class);
        return port;
    }
}
