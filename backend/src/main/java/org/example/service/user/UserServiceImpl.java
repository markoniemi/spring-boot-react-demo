package org.example.service.user;

import java.util.List;

import javax.annotation.Resource;
import javax.jws.WebService;
import javax.transaction.Transactional;

import org.apache.commons.collections4.IterableUtils;
import org.apache.commons.lang3.Validate;
import org.example.model.user.User;
import org.example.repository.user.UserRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j2;

@Primary
@Log4j2
@Component(value = "userService")
@WebService(endpointInterface = "org.example.service.user.UserService", serviceName = "UserService")
public class UserServiceImpl implements UserService {
    @Resource
    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        log.trace("findAll");
        return IterableUtils.toList(userRepository.findAll());
    }

    @Override
    @Transactional
    public User create(User user) {
        Validate.notNull(user, "invalid.user");
        Validate.notBlank(user.getUsername(), "invalid.user.username");
        Validate.isTrue(userRepository.findByUsername(user.getUsername()) == null, "exist.user.username");
        log.trace("create: {}", user);
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public User update(User user) {
        User databaseUser = userRepository.findById(user.getId()).get();
        Validate.notNull(databaseUser, "User does not exist.");
        databaseUser.setEmail(user.getEmail());
        databaseUser.setPassword(user.getPassword());
        databaseUser.setRole(user.getRole());
        databaseUser.setUsername(user.getUsername());
        log.trace("update: {}", databaseUser);
        return userRepository.save(databaseUser);
    }

    @Override
    @Transactional
    public User findById(Long id) {
        log.trace("findById: {}", id);
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
    public User findByEmail(String email) {
        log.trace("findByEmail: {}", email);
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public boolean exists(Long id) {
        return userRepository.findById(id) != null;
    }

    @Override
    @Transactional
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
