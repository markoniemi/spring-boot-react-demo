package org.example;

import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.annotation.Resource;

import org.example.selenium.EditUserPage;
import org.example.selenium.LoginPage;
import org.example.selenium.UsersPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ReactDemoApplicationIT extends AbstractIntegrationTestBase {
    @Resource
    protected WebDriver webDriver;
//    @Resource(name = "loginUrl")
    private String loginUrl = "http://localhost:8080/";
    private UsersPage usersPage;
    private EditUserPage editUserPage;
    private LoginPage loginPage;

    @BeforeEach
    public void setUp() {
        loginPage = new LoginPage(webDriver);
        usersPage = new UsersPage(webDriver);
        editUserPage = new EditUserPage(webDriver);
    }

    @Test
    public void integrationTest() throws InterruptedException {
        webDriver.get(loginUrl);
        loginPage.login("admin", "admin");
        usersPage.clickAddUser();
        editUserPage.addUser("admin_user", "another", "admin_user@test.com", "Admin");
        usersPage.assertUser("admin_user", "admin_user@test.com", "Admin");
        usersPage.clickAddUser();
        editUserPage.addUser("user_user", "another", "user_user@test.com", "User");
        usersPage.assertUser("user_user", "user_user@test.com", "User");
        usersPage.deleteUser("user_user");
        usersPage.logout();
        loginPage.login("admin_user", "another");
        usersPage.clickEditUser("admin_user");
        editUserPage.editUser("admin_user", "newpassword", "admin_user@test.com", "Admin");
        usersPage.logout();
        loginPage.login("admin_user", "newpassword");
        usersPage.deleteUser("admin_user");
        usersPage.logout();
    }

    @Disabled
    @Test
    public void testUI() throws InterruptedException {
        webDriver.get(loginUrl);
        Thread.sleep(2000);
        webDriver.get(loginUrl);
        Thread.sleep(2000);
        assertTrue(webDriver.findElement(By.id("message")).getText().contains("world"));
        usersPage.clickAddUser();
        Thread.sleep(1000);
        editUserPage.editUser("username", "password", "email", "User");
        Thread.sleep(1000);
        usersPage.assertUser("username", "email", "User");
        usersPage.clickEditUser("username");
        Thread.sleep(1000);
        editUserPage.editUser("newUsername", "newPassword", "newEmail", "User");
        Thread.sleep(1000);
        usersPage.assertUser("newUsername", "newEmail", "User");
        usersPage.deleteUser("newUsername");
        // TODO assert user deleted
        Thread.sleep(1000);
        usersPage.clickEditUser("username1");
        Thread.sleep(1000);
        editUserPage.editUser("editedUsername", "editedPassword", "editedEmail", "Admin");
        Thread.sleep(1000);
        usersPage.assertUser("editedUsername", "editedEmail", "Admin");
        usersPage.clickEditUser("editedUsername");
        webDriver.get("http://localhost:8080/users/1");
        editUserPage.editUser("username1", "password", "email", "User");
        usersPage.assertUser("username1", "email", "User");
    }
}
