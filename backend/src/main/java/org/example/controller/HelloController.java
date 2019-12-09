package org.example.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @PostMapping("/api/hello")
    public String hello(@RequestBody String name) {
        return String.format("Hello %s, the time at the server is now %s\n", name, new Date());
    }
}