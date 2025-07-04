package org.example.service.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.example.config.TestConfig;
import org.example.config.TestDatabaseConfig;
import org.example.model.user.Role;
import org.example.model.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import jakarta.validation.ConstraintViolationException;

@Import({ValidationAutoConfiguration.class, TestConfig.class, TestDatabaseConfig.class})
@ExtendWith(SpringExtension.class)
@AutoConfigureDataJpa
@Transactional
@EnableJpaRepositories(basePackages = "org.example.repository.user")
@EntityScan("org.example.model.user")
@ComponentScan("org.example.service.user")
@PropertySource("datasource.properties")
class UserServiceTest {
  @Autowired UserService userService;

  @Test
  void create() {
    User user = new User("username", "password", "email", Role.ROLE_USER);
    user = userService.create(user);
    User savedUser = userService.findById(user.getId());
    assertEquals(user, savedUser);
  }

  @Test
  void createWithInvalidUser() {
    User user = new User("", "", "", Role.ROLE_USER);
    ConstraintViolationException exception =
        assertThrows(ConstraintViolationException.class, () -> userService.create(user));
    assertEquals(3, exception.getConstraintViolations().size());
  }

  @Test
  void createWithNullUser() {
    NullPointerException exception =
        assertThrows(NullPointerException.class, () -> userService.create(null));
    assertEquals("invalid.user", exception.getMessage());
  }

  @Test
  void createWithExistingUser() {
    // TODO use dbunit
    userService.create(new User("username", "password", "email", Role.ROLE_USER));
    User user = new User("username", "password", "email", Role.ROLE_USER);
    IllegalArgumentException exception =
        assertThrows(IllegalArgumentException.class, () -> userService.create(user));
    assertEquals("existing.username", exception.getMessage());
  }

  @Test
  void update() {
    // TODO use dbunit
    userService.create(new User("username", "password", "email", Role.ROLE_USER));
    User user = userService.findByUsername("username");
    user.setEmail("new email");
    user = userService.update(user);
    User savedUser = userService.findById(user.getId());
    assertEquals(user, savedUser);
  }

  @Test
  void updateWithInvalidUser() {
    userService.create(new User("username", "password", "email", Role.ROLE_USER));
    User user = userService.findByUsername("username");
    user.setUsername("");
    user.setEmail("");
    ConstraintViolationException exception =
        assertThrows(ConstraintViolationException.class, () -> userService.update(user));
    assertEquals(2, exception.getConstraintViolations().size());
  }

  @Test
  void updateWithNullUser() {
    NullPointerException exception =
        assertThrows(NullPointerException.class, () -> userService.update(null));
    assertEquals("invalid.user", exception.getMessage());
  }

  @Test
  void updateWithNonexistingUser() {
    User user = new User("username", "password", "email", Role.ROLE_USER);
    user.setId(0L);
    IllegalArgumentException exception =
        assertThrows(IllegalArgumentException.class, () -> userService.update(user));
    assertEquals("nonexistent.user", exception.getMessage());
  }
}
