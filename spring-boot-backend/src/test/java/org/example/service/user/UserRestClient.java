package org.example.service.user;

import java.util.List;

import org.example.model.user.User;
import org.example.security.JwtToken;

import io.restassured.RestAssured;
import io.restassured.mapper.TypeRef;

public class UserRestClient {
    private String url = "http://localhost:8080/api/rest";

    public List<User> findAll() {
        return RestAssured.given().header("Authorization", "Bearer " + JwtToken.createToken("admin"))
                .get(url + "/users/").then().statusCode(200).extract().as(new TypeRef<List<User>>() {
                });
    }

    public List<User> findByEmail(String email) {
        return RestAssured.given().header("Authorization", "Bearer " + JwtToken.createToken("admin"))
                .get(url + "/users?email=" + email).then().statusCode(200).extract().as(new TypeRef<List<User>>() {
                });
    }

    public List<User> findByUsername(String username) {
        return RestAssured.given().header("Authorization", "Bearer " + JwtToken.createToken("admin"))
                .get(url + "/users?username=" + username).then().statusCode(200).extract()
                .as(new TypeRef<List<User>>() {
                });
    }

    public User create(User user) {
        return RestAssured.given().body(user).header("Authorization", "Bearer " + JwtToken.createToken("admin"))
                .header("Content-Type", "application/json").header("Accept", "application/json").post(url + "/users")
                .then().statusCode(200).extract().as(User.class);
    }

    public List<ValidationError> create(String userJson, int statusCode) {
        return RestAssured.given().body(userJson).header("Authorization", "Bearer " + JwtToken.createToken("admin"))
                .header("Content-Type", "application/json").header("Accept", "application/json").post(url + "/users")
                .then().statusCode(statusCode).extract().body().jsonPath().getList(".", ValidationError.class);
    }

    public List<ValidationError> update(String userJson, int statusCode) {
        return RestAssured.given().body(userJson).header("Authorization", "Bearer " + JwtToken.createToken("admin"))
                .header("Content-Type", "application/json").header("Accept", "application/json").put(url + "/users/1")
                .then().statusCode(statusCode).extract().body().jsonPath().getList(".", ValidationError.class);
    }

    public User find(Long id) {
        return RestAssured.given().header("Authorization", "Bearer " + JwtToken.createToken("admin"))
                .get(url + "/users/" + id).then().statusCode(200).extract().as(User.class);
    }

    public void delete(Long id) {
        delete(id, 204);
    }

    public void delete(Long id, int statusCode) {
        RestAssured.given().header("Authorization", "Bearer " + JwtToken.createToken("admin"))
                .delete(url + "/users/" + id).then().statusCode(statusCode);
    }

}
