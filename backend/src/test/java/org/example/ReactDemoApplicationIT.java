package org.example;

import javax.annotation.Resource;

import org.example.config.IntegrationTestConfig;
import org.example.selenium.EditUserPage;
import org.example.selenium.UsersPage;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactDemoApplication.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ContextHierarchy(@ContextConfiguration(classes = IntegrationTestConfig.class))
public class ReactDemoApplicationIT {
    @Resource
    protected WebDriver webDriver;
    private UsersPage usersPage;
    private EditUserPage editUserPage;

    @Before
    public void setUp() {
        usersPage = new UsersPage(webDriver);
        editUserPage = new EditUserPage(webDriver);
    }

    @Test
    public void helloWorld() throws InterruptedException {
        webDriver.get("http://localhost:8080");
        Thread.sleep(2000);
        webDriver.get("http://localhost:8080");
        Thread.sleep(2000);
        Assert.assertTrue(webDriver.findElement(By.id("message")).getText().contains("world"));
        usersPage.clickAddUser();
        Thread.sleep(1000);
        editUserPage.editUser("username", "password", "email");
        Thread.sleep(1000);
        usersPage.assertUser("username", "email");
        usersPage.clickEditUser("username");
        Thread.sleep(1000);
        editUserPage.editUser("newUsername", "newPassword", "newEmail");
        Thread.sleep(1000);
        usersPage.assertUser("newUsername", "newEmail");
        usersPage.deleteUser("newUsername");
        // TODO assert user deleted
        Thread.sleep(1000);
        usersPage.clickEditUser("username1");
        Thread.sleep(1000);
        editUserPage.editUser("editedUsername", "editedPassword", "editedEmail");
        Thread.sleep(1000);
        usersPage.assertUser("editedUsername", "editedEmail");
        usersPage.clickEditUser("editedUsername");
        editUserPage.editUser("username1", "password", "email");
    }
}
