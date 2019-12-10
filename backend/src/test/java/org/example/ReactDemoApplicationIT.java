package org.example;

import javax.annotation.Resource;

import org.example.config.IntegrationTestConfig;
import org.junit.Assert;
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

    @Test
    public void helloWorld() throws InterruptedException {
        webDriver.get("http://localhost:8080");
        Thread.sleep(5000);
        System.out.println(webDriver.getPageSource());
        Assert.assertTrue(webDriver.findElement(By.className("App-title")).getText().contains("world"));
    }
}
