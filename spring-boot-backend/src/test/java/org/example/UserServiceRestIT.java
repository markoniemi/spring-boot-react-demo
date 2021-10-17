package org.example;

import java.util.Arrays;
import java.util.List;

import org.example.model.user.Role;
import org.example.model.user.User;
import org.example.security.JwtToken;
import org.example.service.user.UserRestClient;
import org.example.service.user.ValidationError;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;

import io.restassured.RestAssured;
import io.restassured.mapper.TypeRef;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class UserServiceRestIT extends AbstractIntegrationTestBase {
    private String url = "http://localhost:8080/api/rest";
    private UserRestClient userService = new UserRestClient();

    @Test
    @Ignore
    public void findAll() throws JsonProcessingException {
        List<User> users = userService.findAll();
        Assert.assertNotNull(users);
        Assert.assertEquals(6, users.size());
    }

    @Test
    public void find() throws JsonProcessingException {
        List<User> users = userService.findAll();
        Assert.assertNotNull(users);
        log.info(Arrays.toString(users.toArray()));
        Assert.assertEquals(6, users.size());
        users = userService.findByEmail("email0");
        Assert.assertNotNull(users);
        log.info(Arrays.toString(users.toArray()));
        Assert.assertEquals(1, users.size());
        Assert.assertEquals("email0", users.get(0).getEmail());
        users = userService.findByUsername("username0");
        Assert.assertNotNull(users);
        Assert.assertEquals(1, users.size());
        Assert.assertEquals("username0", users.get(0).getUsername());
    }

    @Test
    public void create() throws JsonProcessingException {
        User user = new User("username", "password", "email", Role.ROLE_USER);
        user = userService.create(user);
        Assert.assertNotNull(user);
        Assert.assertNotNull(user.getId());
        user = userService.find(user.getId());
        Assert.assertNotNull(user);
        Assert.assertNotNull(user.getId());
        userService.delete(user.getId());
    }

    @Test
    public void createWithValidationError() throws JsonProcessingException {
        String userJson = "{\"username\":null}";
        List<ValidationError> validationErrors = userService.create(userJson, 400);
        Assert.assertEquals(1, validationErrors.size());
        ValidationError validationError = validationErrors.get(0);
        log.debug(validationError);
        Assert.assertEquals("user", validationError.getObjectName());
        Assert.assertEquals("username", validationError.getField());
        Assert.assertEquals("field.required", validationError.getCode());
    }

    @Test
    public void updateWithValidationError() throws JsonProcessingException {
        String userJson = "{\"id\":1, \"username\":null}";
        List<ValidationError> validationErrors = userService.update(userJson, 400);
        log.debug(Arrays.toString(validationErrors.toArray()));
//        Assert.assertEquals(1, validationErrors.size());
        ValidationError validationError = validationErrors.get(0);
        Assert.assertEquals("User", validationError.getObjectName());
//        Assert.assertEquals("username", validationError.getField());
        Assert.assertEquals("field.required", validationError.getCode());
    }

    @Test
    public void deleteNonExistent() {
        userService.delete(1000L, 404);
    }
}
