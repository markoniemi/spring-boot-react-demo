package org.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;

import org.example.model.user.Role;
import org.example.model.user.User;
import org.example.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.validation.BindException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

public class UserServiceFeignIT extends AbstractIntegrationTestBase {
    @Resource
    private UserService userService;

    @Test
    public void findAll() throws JsonParseException, JsonMappingException, IOException {
        List<User> users = userService.findAll();
        assertNotNull(users);
        assertEquals(6, users.size());
    }

    public void create() throws BindException {
        User user = new User("username", "password", "email", Role.ROLE_USER);
        userService.create(user);
        User savedUser = userService.findByUsername("username");
        assertEquals("username", user.getUsername());
        savedUser = userService.findByUsername("email");
        assertEquals("email", user.getEmail());
        assertTrue(userService.exists(savedUser.getId()));
        savedUser = userService.findById(savedUser.getId());
        assertEquals("username", user.getUsername());
        userService.delete(savedUser.getId());
        savedUser = userService.findByUsername("username");
        assertNull(savedUser);
    }
}
