package org.example;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.example.config.IntegrationTestConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;

/**
 * Base class for integration tests, enables running multiple tests
 * with @SpringBootTest
 */
@SpringBootTest(classes = ReactDemoApplication.class, webEnvironment = WebEnvironment.DEFINED_PORT)
@ContextHierarchy(@ContextConfiguration(classes = IntegrationTestConfig.class))
public class AbstractIntegrationTestBase {
    @Test
    public void dummy() {
        assertTrue(true);
    }
}
