package org.example.service.user;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.Service;
import javax.xml.ws.handler.MessageContext;

import org.example.ReactDemoApplication;
import org.example.config.IntegrationTestConfig;
import org.example.model.user.User;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.log4j.Log4j2;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactDemoApplication.class, webEnvironment = WebEnvironment.DEFINED_PORT)
@ContextHierarchy(@ContextConfiguration(classes = IntegrationTestConfig.class))
@Log4j2
@Ignore
public class UserServiceIT {
    private TestRestTemplate testRestTemplate = new TestRestTemplate();
    private String url = "http://localhost:8080";

    public UserService getUserWsClient() throws MalformedURLException {
        URL wsdlURL = new URL("http://localhost:8080/api/soap/users?wsdl");
        QName qname = new QName("http://user.service.example.org/", "UserService");
        Service service = Service.create(wsdlURL, qname);
        UserService userService = service.getPort(UserService.class);
        setHeader(userService, "Authentication", "Bearer: ");
        return userService;
    }

    private void setHeader(UserService userService, String header, String value) {
        Map<String, List<String>> requestHeaders = new HashMap<>();
        requestHeaders.put(header, Arrays.asList(value));
        Map<String, Object> requestContext = ((BindingProvider) userService).getRequestContext();
        requestContext.put(MessageContext.HTTP_REQUEST_HEADERS, requestHeaders);
    }

    @Test
    public void getUsersRest() throws JsonParseException, JsonMappingException, IOException {
        ResponseEntity<String> responseString = testRestTemplate.getForEntity(url + "/api/rest/users", String.class);
        Assert.assertNotNull(responseString);
        List<User> users = parseResponse(responseString);
        Assert.assertNotNull(users);
        Assert.assertEquals(6, users.size());
    }

    @Test
    public void getUserRest() throws JsonParseException, JsonMappingException, IOException {
        User user = testRestTemplate.getForObject(url + "/api/rest/users/username/admin1", User.class);
        Assert.assertEquals("admin1", user.getUsername());
    }

    @Test
    public void getUsersWs() throws JsonParseException, JsonMappingException, IOException {
        UserService userService = getUserWsClient();
        List<User> users = userService.findAll();
        Assert.assertNotNull(users);
        Assert.assertEquals(6, users.size());
    }

    private List<User> parseResponse(ResponseEntity<String> responseString)
            throws IOException, JsonParseException, JsonMappingException {
        return new ObjectMapper().readValue(responseString.getBody(), new TypeReference<List<User>>() {
        });
    }
}
