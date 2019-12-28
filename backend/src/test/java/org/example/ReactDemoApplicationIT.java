package org.example;

import javax.annotation.Resource;

import org.example.config.IntegrationTestConfig;
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

    @Before
    public void setUp() {
        usersPage = new UsersPage(webDriver);
    }

    @Test
    public void helloWorld() throws InterruptedException {
        webDriver.get("http://localhost:8080");
        Thread.sleep(2000);
        webDriver.get("http://localhost:8080");
        Thread.sleep(2000);
        Assert.assertTrue(webDriver.findElement(By.id("message")).getText().contains("world"));
        usersPage.clickAddUser();
        usersPage.editUser("", "username", "email");
        usersPage.assertUser("username", "email");
        usersPage.editUser("username", "newUsername", "newEmail");
        usersPage.assertUser("newUsername", "newEmail");
        usersPage.deleteUser("newUsername");
        // TODO assert user deleted
        usersPage.editUser("username1", "editedUsername", "editedEmail");
        usersPage.assertUser("editedUsername", "editedEmail");
        usersPage.editUser("editedUsername", "username1", "email");
    }
}
