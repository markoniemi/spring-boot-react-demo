package org.example.selenium;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class UsersPage extends AbstractPage {
  public UsersPage(WebDriver webDriver) {
    super(webDriver);
  }

  public void clickAddUser() {
    click(By.id("addUser"));
  }

  public void clickEditUser(String username) {
    click(By.xpath("//button[@id='edit." + username + "']"));
  }

  public void deleteUser(String username) {
    click(By.xpath("//button[@id='delete." + username + "']"));
    webDriver.switchTo().alert().accept();
  }

  public void assertUser(String username, String email, String role) {
    WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions
        .visibilityOfElementLocated(By.xpath("//tr[@id='" + username + "']//td[@id='username']")));
    assertEquals(username, getText(By.xpath("//tr[@id='" + username + "']//td[@id='username']")));
    assertEquals(email, getText(By.xpath("//tr[@id='" + username + "']//td[@id='email']")));
    assertEquals(role, getText(By.xpath("//tr[@id='" + username + "']//td[@id='role']")));
  }

  public void logout() {
    click(By.id("logout"));
    // assertTitle("Login");
  }
}
