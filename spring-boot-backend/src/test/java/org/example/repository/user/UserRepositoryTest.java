package org.example.repository.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.example.config.TestDatabaseConfig;
import org.example.model.user.Role;
import org.example.model.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Import(TestDatabaseConfig.class)
@ExtendWith(SpringExtension.class)
@AutoConfigureDataJpa
@Transactional
@EnableJpaRepositories(basePackages = "org.example.repository.user")
@EntityScan("org.example.model.user")
@PropertySource("datasource.properties")
class UserRepositoryTest {
  @Autowired UserRepository userRepository;
  @PersistenceContext EntityManager entityManager;

  @Test
  void test() {
    User user = new User("username", "password", "email", Role.ROLE_USER);
    user = userRepository.save(user);
    entityManager.flush();
    User savedUser = userRepository.findById(user.getId()).orElseThrow();
    assertEquals(user, savedUser);
  }
}
