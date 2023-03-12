package org.example;

import javax.annotation.Resource;

import org.example.selenium.EditUserPage;
import org.example.selenium.LoginPage;
import org.example.selenium.UsersPage;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Value;

public class ReactDemoApplicationIT extends AbstractIntegrationTestBase {
    @Resource
    protected WebDriver webDriver;
    @Value("${loginUrl:http://localhost:8080}")
    private String loginUrl;
    private UsersPage usersPage;
    private EditUserPage editUserPage;
    private LoginPage loginPage;

    @BeforeEach
    public void setUp() {
        loginPage = new LoginPage(webDriver);
        usersPage = new UsersPage(webDriver);
        editUserPage = new EditUserPage(webDriver);
    }
    @AfterEach
    public void tearDown() {
        webDriver.close();
        webDriver.quit();
    }

    @Test
    public void testUI() throws InterruptedException {
        webDriver.get(loginUrl);
        loginPage.login("admin", "admin");
        usersPage.clickAddUser();
        editUserPage.editUser("username", "password", "email", "User");
        usersPage.assertUser("username", "email", "User");
        usersPage.logout();
        loginPage.login("username", "password");
        usersPage.assertUser("username", "email", "User");
        usersPage.logout();
        loginPage.login("admin", "admin");
        usersPage.clickEditUser("username");
        editUserPage.editUser("newUsername", "newPassword", "newEmail", "User");
        usersPage.assertUser("newUsername", "newEmail", "User");
        usersPage.deleteUser("newUsername");
        // TODO assert user deleted
    }
}
