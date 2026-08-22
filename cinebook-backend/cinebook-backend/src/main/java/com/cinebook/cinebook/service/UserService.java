package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.auth.LoginRequestDTO;
import com.cinebook.cinebook.dto.auth.LoginResponseDTO;
import com.cinebook.cinebook.dto.request.UserRequestDTO;
import com.cinebook.cinebook.dto.response.UserResponseDTO;

public interface UserService {
    UserResponseDTO register(UserRequestDTO request);
    LoginResponseDTO login(LoginRequestDTO request);
}
