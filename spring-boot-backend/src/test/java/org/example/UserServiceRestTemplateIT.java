package org.example;

import java.io.IOException;
import java.util.Collections;

import javax.annotation.Resource;

import org.example.config.IntegrationTestConfig;
import org.example.config.RestRequestInterceptor;
import org.example.model.user.Role;
import org.example.model.user.User;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import lombok.extern.log4j.Log4j2;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactDemoApplication.class, webEnvironment = WebEnvironment.DEFINED_PORT)
@ContextHierarchy(@ContextConfiguration(classes = IntegrationTestConfig.class))
@Log4j2
public class UserServiceRestTemplateIT {
    private TestRestTemplate testRestTemplate = new TestRestTemplate();
    private String url = "http://localhost:8080";
    @Resource
    private RestRequestInterceptor requestInterceptor;

    @Before
    public void setUp() {
        testRestTemplate.getRestTemplate().setInterceptors(Collections.singletonList(requestInterceptor));
    }


    @Test
    public void findAll() throws JsonParseException, JsonMappingException, IOException {
        User[] users = testRestTemplate.getForObject(url + "/api/rest/users", User[].class);
        Assert.assertNotNull(users);
        Assert.assertEquals(6, users.length);
    }

    @Test
    public void findById() throws JsonParseException, JsonMappingException, IOException {
        User user = testRestTemplate.getForObject(url + "/api/rest/users/1", User.class);
        Assert.assertEquals("admin", user.getUsername());
    }

    @Test
    public void findByUsername() throws JsonParseException, JsonMappingException, IOException {
        User user = testRestTemplate.getForObject(url + "/api/rest/users/username/admin", User.class);
        Assert.assertEquals("admin", user.getUsername());
    }

    @Test
    @Ignore
    public void create() throws JsonProcessingException {
        User user = new User("test", "test", "email", Role.ROLE_USER);
        User savedUser = testRestTemplate.postForObject(url + "/api/rest/users", new HttpEntity<User>(user),
                User.class);
        Assert.assertNotNull(savedUser);
        Assert.assertNotNull(savedUser.getId());
        User[] users = testRestTemplate.getForObject(url + "/api/rest/users", User[].class);
        Assert.assertEquals(7, users.length);
        user = testRestTemplate.getForObject(url + "/api/rest/users/username/test", User.class);
        Assert.assertEquals("test", user.getUsername());
        testRestTemplate.delete(url + "/api/rest/users/" + user.getId());
        user = testRestTemplate.getForObject(url + "/api/rest/users/username/test", User.class);
    }

    @Test
    public void deleteNonExistent() {
        try {
            testRestTemplate.delete(url + "/api/rest/users/10000");
        } catch (HttpClientErrorException e) {
            log.error(e);
        } catch (Throwable e) {
            log.error(e);
        }
    }
}
