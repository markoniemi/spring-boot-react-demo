package org.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class EditUserPage extends AbstractPage {

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

    public void addUser(String username, String password, String email, String role) throws InterruptedException {
        editUser(username, password, email, role);
    }
    public void validateUser() {
        setText(By.id("username"), "");
        setText(By.id("password"), "");
        setText(By.id("email"), "");
        selectByText(By.id("role"), "User");
        click(By.id("saveUser"));
        assertFieldError("Username required");
        assertFieldError("Email required");
        assertFieldError("Password required");
//        assertFieldError("Role required");
        // TODO implement cancel button
        click(By.id("cancel"));
    }

    private void assertFieldError(String text) {
      assertByText(text);
    }
}
