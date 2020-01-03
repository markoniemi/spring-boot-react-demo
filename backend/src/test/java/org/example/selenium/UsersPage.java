package org.example.selenium;

import org.junit.Assert;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class UsersPage extends AbstractPage {
    public UsersPage(WebDriver webDriver) {
        super(webDriver);
    }

    public void clickAddUser() {
        click(By.id("addUser"));
    }

    public void clickEditUser(String username) {
        click(By.xpath("//tr[@id='" + username + "']//td[@id='username']//a"));
    }

    public void deleteUser(String username) {
        click(By.xpath("//tr[@id='" + username + "']//button[@id='delete']"));
        Alert alert = webDriver.switchTo().alert();
        alert.accept();
    }

    public void assertUser(String username, String email) {
        Assert.assertEquals(username, getText(By.xpath("//tr[@id='" + username + "']//td[@id='username']")));
        Assert.assertEquals(email, getText(By.xpath("//tr[@id='" + username + "']//td[@id='email']")));
    }
}
