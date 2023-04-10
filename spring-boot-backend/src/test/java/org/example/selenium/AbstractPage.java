package org.example.selenium;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

public abstract class AbstractPage {
    protected WebDriver webDriver;

    public AbstractPage(WebDriver webDriver) {
        this.webDriver = webDriver;
    }
    protected void sleep(int ms) {
      try {
        Thread.sleep(ms);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }

    protected String getText(By by) {
        return webDriver.findElement(by).getText();
    }
    protected void setText(By by, String value) {
        webDriver.findElement(by).clear();
        webDriver.findElement(by).sendKeys(value);
    }

    protected void click(By by) {
        webDriver.findElement(by).click();
    }

    protected void assertTitle(String title) {
        assertEquals(title, webDriver.getTitle());
    }

    protected void selectByValue(By by, String value) {
        new Select(webDriver.findElement(by)).selectByValue(value);
    }
    protected void selectByText(By by, String value) {
        new Select(webDriver.findElement(by)).selectByVisibleText(value);
    }
}
