package org.example.service.user;

import java.util.List;
import org.apache.commons.collections4.IterableUtils;
import org.apache.commons.lang3.Validate;
import org.example.model.user.User;
import org.example.repository.user.UserRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import jakarta.annotation.Resource;
import jakarta.jws.WebService;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.log4j.Log4j2;

@Primary
@Log4j2
@Service(value = "userService")
@WebService(endpointInterface = "org.example.service.user.UserService", serviceName = "UserService")
public class UserServiceImpl implements UserService {
  @Resource UserRepository userRepository;

  @Override
  @Transactional
  public List<User> findAll() {
    log.trace("findAll");
    return IterableUtils.toList(userRepository.findAll());
  }

  @Override
  @Transactional
  public List<User> search(UserSearchForm searchForm) {
    log.trace("search: {}", searchForm);
    // findByUsernameOrEmailOrRole returns nothing if searchForm is empty
    if (searchForm.isEmpty()) {
      return IterableUtils.toList(userRepository.findAll());
    }
    return userRepository.findByUsernameOrEmailOrRole(
        searchForm.getUsername(), searchForm.getEmail(), searchForm.getRole());
  }

  @Override
  @Transactional
  public User create(User user) throws ConstraintViolationException {
    Validate.notNull(user, "invalid.user");
    Validate.isTrue(!userRepository.existsByUsername(user.getUsername()), "existing.username");
    log.trace("create: {}", user);
    return userRepository.save(user);
  }

  @Override
  @Transactional
  public User update(User user) throws ConstraintViolationException {
    Validate.notNull(user, "invalid.user");
    Validate.isTrue(userRepository.existsById(user.getId()), "nonexistent.user");
    log.trace("update: {}", user);
    return userRepository.save(user);
  }

  @Override
  @Transactional
  public User findById(Long id) {
    log.trace("findById: {}", id);
    Validate.notNull(id, "null.id");
    return userRepository.findById(id).get();
  }

  @Override
  @Transactional
  public User findByUsername(String username) {
    log.trace("findByUsername: {}", username);
    return userRepository.findByUsername(username);
  }

  @Override
  @Transactional
  public boolean exists(Long id) {
    log.trace("exists: {}", id);
    return userRepository.findById(id) != null;
  }

  @Override
  @Transactional
  /** If the entity is not found in the persistence store it is silently ignored. */
  public void delete(Long id) {
    log.trace("delete: {}", id);
    userRepository.deleteById(id);
  }

  @Override
  @Transactional
  public long count() {
    return userRepository.count();
  }
}
