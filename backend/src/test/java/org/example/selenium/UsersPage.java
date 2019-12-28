package org.example.selenium;

import org.junit.Assert;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class UsersPage extends AbstractPage {
    public UsersPage(WebDriver webDriver) {
        super(webDriver);
    }

    public void clickAddUser() {
        click(By.id("addUser"));
    }

    public WebElement getRow(String username) {
        return webDriver.findElement(By.xpath("//tr[contains(td/text(),'" + username + "')]"));
    }

    public void editUser(String username, String newUsername, String email) throws InterruptedException {
        click(By.xpath("//tr[@id='" + username + "']//button[@id='edit']"));
        setText(By.xpath("//tr[@id='" + username + "']//input[@id='usernameInput']"), newUsername);
        setText(By.xpath("//tr[@id='" + username + "']//input[@id='emailInput']"), email);
        setText(By.xpath("//tr[@id='" + username + "']//input[@id='passwordInput']"), username);
        click(By.xpath("//tr[@id='" + username + "']//button[@id='submit']"));
    }

    public void assertUser(String username, String email) {
        Assert.assertEquals(username, getText(By.xpath("//tr[@id='" + username + "']//td[@id='username']")));
        Assert.assertEquals(email, getText(By.xpath("//tr[@id='" + username + "']//td[@id='email']")));
    }

    public void deleteUser(String username) {
        click(By.xpath("//tr[@id='" + username + "']//button[@id='delete']"));
        Alert alert = webDriver.switchTo().alert();
        alert.accept();        
    }
}
