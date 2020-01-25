package org.example.selenium;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class EditUserPage extends AbstractPage{

    public EditUserPage(WebDriver webDriver) {
        super(webDriver);
    }

    public void editUser(String username, String password, String email, String role) throws InterruptedException {
        setText(By.id("username"), username);
        setText(By.id("password"), password);
        setText(By.id("email"), email);
        selectByText(By.id("role"), role);
        click(By.id("saveUser"));
    }
}
