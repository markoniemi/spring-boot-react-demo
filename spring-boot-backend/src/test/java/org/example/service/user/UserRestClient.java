package org.example.service.user;

import java.util.Arrays;
import java.util.List;

import org.example.model.user.User;
import org.example.security.JwtToken;

import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.http.Headers;
import io.restassured.common.mapper.TypeRef;


public class UserRestClient {
    private String url = "http://localhost:8080/api/rest";

    public List<User> findAll() {
        return RestAssured.given().headers(createHeaders()).get(url + "/users/").then().statusCode(200).extract()
                .as(userListType());
    }

    public List<User> findByEmail(String email) {
        return RestAssured.given().headers(createHeaders()).get(url + "/users?email=" + email).then().statusCode(200)
                .extract().as(userListType());
    }

    public List<User> findByUsername(String username) {
        return RestAssured.given().headers(createHeaders()).get(url + "/users?username=" + username).then()
                .statusCode(200).extract().as(userListType());
    }

    public User create(User user) {
        return RestAssured.given().body(user).headers(createHeaders()).post(url + "/users").then().statusCode(200)
                .extract().as(User.class);
    }

    public List<ValidationError> create(String userJson, int statusCode) {
        return RestAssured.given().body(userJson).headers(createHeaders()).post(url + "/users").then()
                .statusCode(statusCode).extract().body().jsonPath().getList(".", ValidationError.class);
    }

    public List<ValidationError> update(String userJson, long id, int statusCode) {
        return RestAssured.given().body(userJson).headers(createHeaders()).put(url + "/users/" + id).then()
                .statusCode(statusCode).extract().body().jsonPath().getList(".", ValidationError.class);
    }

    public User find(Long id) {
        return RestAssured.given().headers(createHeaders()).get(url + "/users/" + id).then().statusCode(200).extract()
                .as(User.class);
    }

    public void delete(Long id) {
        delete(id, 204);
    }

    public void delete(Long id, int statusCode) {
        RestAssured.given().headers(createHeaders()).delete(url + "/users/" + id).then().statusCode(statusCode);
    }

    private TypeRef<List<User>> userListType() {
        return new TypeRef<List<User>>() {
        };
    }

    private Headers createHeaders() {
        return new Headers(Arrays.asList(new Header("Authorization", "Bearer " + JwtToken.createToken("admin")),
                new Header("Content-Type", "application/json"), new Header("Accept", "application/json")));
    }
}
