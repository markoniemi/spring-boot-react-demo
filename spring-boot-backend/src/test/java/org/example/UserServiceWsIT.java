package org.example;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.example.config.IntegrationTestConfig;
import org.example.model.user.User;
import org.example.service.user.UserService;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactDemoApplication.class, webEnvironment = WebEnvironment.DEFINED_PORT)
@ContextHierarchy(@ContextConfiguration(classes = IntegrationTestConfig.class))
@Ignore
public class UserServiceWsIT {

    @Test
    public void getUsers() throws JsonParseException, JsonMappingException, IOException {
        UserService userService = getUserClient();
        List<User> users = userService.findAll();
        Assert.assertNotNull(users);
        Assert.assertEquals(6, users.size());
    }

    public UserService getUserClient() throws MalformedURLException {
        URL wsdlURL = new URL("http://localhost:8080/api/soap/users?wsdl");
        QName qname = new QName("http://user.service.example.org/", "UserService");
        Service service = Service.create(wsdlURL, qname);
        UserService port = service.getPort(UserService.class);
        return port;
    }
}
