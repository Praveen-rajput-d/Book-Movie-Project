package com.cinebook.cinebook.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Testcontroller {
    @GetMapping("/api/test/user")
    public String userApi(){
        return "User API Accessed";
    }

    @PostMapping("/api/test/admin")
    public String adminApi(){
        return "Admin API Accessed";
    }
}
