package org.example;

import java.util.List;

import org.example.config.IntegrationTestConfig;
import org.example.model.user.Role;
import org.example.model.user.User;
import org.junit.Assert;
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

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactDemoApplication.class, webEnvironment = WebEnvironment.DEFINED_PORT)
@ContextHierarchy(@ContextConfiguration(classes = IntegrationTestConfig.class))
@Log4j2
public class UserServiceRestIT {
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
    public void deleteNonExistent() {
        ExtractableResponse<Response> response = RestAssured.when().delete(url + "/api/rest/users/10000").then()
                .statusCode(404).extract();
    }
}
