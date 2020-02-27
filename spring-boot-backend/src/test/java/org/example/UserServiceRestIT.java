package org.example;

import java.util.Arrays;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.example.config.IntegrationTestConfig;
import org.example.model.user.Role;
import org.example.model.user.User;
import org.example.service.user.ValidationError;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class UserServiceRestIT extends AbstractIntegrationTestBase {
    private String url = "http://localhost:8080";
    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void findAll() throws JsonProcessingException {
        List<User> users = RestAssured.get(url + "/api/rest/users/").then().statusCode(200).extract().body().jsonPath()
                .getList(".", User.class);
        Assert.assertNotNull(users);
        Assert.assertEquals(6, users.size());
    }

    @Test
    public void create() throws JsonProcessingException {
        String userJson = objectMapper.writeValueAsString(new User("username", "password", "email", Role.ROLE_USER));
        User user = RestAssured.given().body(userJson).header("Content-Type", "application/json")
                .header("Accept", "application/json").post(url + "/api/rest/users").then().statusCode(200).extract()
                .as(User.class);
        Assert.assertNotNull(user);
        Assert.assertNotNull(user.getId());
        user = RestAssured.get(url + "/api/rest/users/" + user.getId()).then().statusCode(200).extract().as(User.class);
        Assert.assertNotNull(user);
        Assert.assertNotNull(user.getId());
        RestAssured.when().delete(url + "/api/rest/users/" + user.getId()).then().statusCode(204);
    }

    @Test
    public void createWithValidationError() throws JsonProcessingException {
        String userJson = "{\"username\":null}";
        List<ValidationError> validationErrors = RestAssured.given().body(userJson)
                .header("Content-Type", "application/json").header("Accept", "application/json")
                .post(url + "/api/rest/users").then().statusCode(400).extract().body().jsonPath()
                .getList(".", ValidationError.class);

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
        List<ValidationError> validationErrors = RestAssured.given().body(userJson)
                .header("Content-Type", "application/json").header("Accept", "application/json")
                .put(url + "/api/rest/users/1").then().statusCode(400).extract().body().jsonPath()
                .getList(".", ValidationError.class);
        log.debug(Arrays.toString(validationErrors.toArray()));
//        Assert.assertEquals(1, validationErrors.size());
        ValidationError validationError = validationErrors.get(0);
//        log.debug(validationError);
        Assert.assertEquals("User", validationError.getObjectName());
//        Assert.assertEquals("username", validationError.getField());
        Assert.assertEquals("field.required", validationError.getCode());
    }

    @Test
    public void deleteNonExistent() {
        ExtractableResponse<Response> response = RestAssured.when().delete(url + "/api/rest/users/10000").then()
                .statusCode(404).extract();
    }
}
