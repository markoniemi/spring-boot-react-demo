package org.example;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.example.config.IntegrationTestConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit.jupiter.SpringExtension;

/**
 * Base class for integration tests, enables running multiple tests
 * with @SpringBootTest
 */
@SpringBootTest(classes = ReactDemoApplication.class, webEnvironment = WebEnvironment.DEFINED_PORT)
@ExtendWith(SpringExtension.class)
@ContextHierarchy(@ContextConfiguration(classes = IntegrationTestConfig.class))
public class AbstractIntegrationTestBase {
    @Test
    public void dummy() {
        assertTrue(true);
    }
}
