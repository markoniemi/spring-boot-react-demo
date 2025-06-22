package org.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import lombok.extern.slf4j.Slf4j;
@Slf4j
public class LoginPage extends AbstractPage {
    public LoginPage(WebDriver webDriver) {
        super(webDriver);
    }

    public void login(String username, String password) {
        log.debug(webDriver.getPageSource());
        setText(By.id("username"), username);
        setText(By.id("password"), password);
        click(By.id("login"));
//        assertTitle("Users");
    }
}
