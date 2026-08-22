package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.auth.LoginRequestDTO;
import com.cinebook.cinebook.dto.auth.LoginResponseDTO;
import com.cinebook.cinebook.dto.request.UserRequestDTO;
import com.cinebook.cinebook.dto.response.UserResponseDTO;
import com.cinebook.cinebook.service.UserService;
import jakarta.validation.Valid;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO>register(@Valid @RequestBody UserRequestDTO request){
        UserResponseDTO response=userService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO>login(@Valid @RequestBody LoginRequestDTO request){
        LoginResponseDTO response=userService.login(request);
        return ResponseEntity.ok(response);
    }
}
