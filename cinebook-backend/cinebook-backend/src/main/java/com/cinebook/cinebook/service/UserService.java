package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.auth.LoginRequestDTO;
import com.cinebook.cinebook.dto.auth.LoginResponseDTO;
import com.cinebook.cinebook.dto.request.ChangePassword;
import com.cinebook.cinebook.dto.request.UpdateProfileRequestDto;
import com.cinebook.cinebook.dto.request.UserRequestDTO;
import com.cinebook.cinebook.dto.response.AdminUpdateResponseDto;
import com.cinebook.cinebook.dto.response.UserProfileResponse.UserProfileResponseDto;
import com.cinebook.cinebook.dto.response.UserResponseDTO;

import java.util.List;

public interface UserService {
    UserResponseDTO register(UserRequestDTO request);
    LoginResponseDTO login(LoginRequestDTO request);

    //user profile methods
    UserProfileResponseDto getMyprofile();

    UserProfileResponseDto updateProfile(UpdateProfileRequestDto requestDto);

    void changePassword(ChangePassword request);
    void deleteAccount();


    //admin functionality

    List<UserResponseDTO>getAllActiveUsers();
    UserResponseDTO getUsersById(Long userid);
    UserResponseDTO updateUserById(Long userid, AdminUpdateResponseDto responseDto);
     void deleteUserById(Long userid);
     UserResponseDTO restoreUser(Long userid);

     List<UserResponseDTO>getAllDeletedUsers();
     List<UserResponseDTO>getAllUser();

     UserResponseDTO searchUserByEmail(String email);
     UserResponseDTO searchUserByPhone(String phone);


}
