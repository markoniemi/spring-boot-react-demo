package org.example;

import java.util.Arrays;
import java.util.List;

import org.example.model.user.Role;
import org.example.model.user.User;
import org.example.service.user.ValidationError;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;

import io.restassured.RestAssured;
import io.restassured.mapper.TypeRef;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class UserServiceRestIT extends AbstractIntegrationTestBase {
    private String url = "http://localhost:8080/api/rest";

    @Test
    @Ignore
    public void findAll() throws JsonProcessingException {
        List<User> users = RestAssured.get(url + "/users/").then().statusCode(200).extract()
                .as(new TypeRef<List<User>>() {
                });
        Assert.assertNotNull(users);
        Assert.assertEquals(6, users.size());
    }

    @Test
    public void search() throws JsonProcessingException {
        List<User> users = RestAssured.get(url + "/users/").then().statusCode(200).extract()
                .as(new TypeRef<List<User>>() {
                });
        Assert.assertNotNull(users);
        log.info(Arrays.toString(users.toArray()));
        Assert.assertEquals(6, users.size());
        users = RestAssured.get(url + "/users?email=email0").then().statusCode(200).extract()
                .as(new TypeRef<List<User>>() {
                });
        Assert.assertNotNull(users);
        log.info(Arrays.toString(users.toArray()));
        Assert.assertEquals(1, users.size());
        Assert.assertEquals("email0", users.get(0).getEmail());
        users = RestAssured.get(url + "/users?username=username0").then().statusCode(200).extract()
                .as(new TypeRef<List<User>>() {
                });
        Assert.assertNotNull(users);
        Assert.assertEquals(1, users.size());
        Assert.assertEquals("username0", users.get(0).getUsername());
    }

    @Test
    public void create() throws JsonProcessingException {
        User user = new User("username", "password", "email", Role.ROLE_USER);
        user = RestAssured.given().body(user).header("Content-Type", "application/json")
                .header("Accept", "application/json").post(url + "/users").then().statusCode(200).extract()
                .as(User.class);
        Assert.assertNotNull(user);
        Assert.assertNotNull(user.getId());
        user = RestAssured.get(url + "/users/" + user.getId()).then().statusCode(200).extract().as(User.class);
        Assert.assertNotNull(user);
        Assert.assertNotNull(user.getId());
        RestAssured.when().delete(url + "/users/" + user.getId()).then().statusCode(204);
    }

    @Test
    public void createWithValidationError() throws JsonProcessingException {
        String userJson = "{\"username\":null}";
        List<ValidationError> validationErrors = RestAssured.given().body(userJson)
                .header("Content-Type", "application/json").header("Accept", "application/json").post(url + "/users")
                .then().statusCode(400).extract().body().jsonPath().getList(".", ValidationError.class);

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
                .header("Content-Type", "application/json").header("Accept", "application/json").put(url + "/users/1")
                .then().statusCode(400).extract().body().jsonPath().getList(".", ValidationError.class);
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
        ExtractableResponse<Response> response = RestAssured.when().delete(url + "/users/10000").then().statusCode(404)
                .extract();
    }
}
