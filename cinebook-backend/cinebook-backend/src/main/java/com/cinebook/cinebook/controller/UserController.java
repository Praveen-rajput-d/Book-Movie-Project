package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.request.ChangePassword;
import com.cinebook.cinebook.dto.request.UpdateProfileRequestDto;
import com.cinebook.cinebook.dto.response.AdminUpdateResponseDto;
import com.cinebook.cinebook.dto.response.UserProfileResponse.UserProfileResponseDto;
import com.cinebook.cinebook.dto.response.UserResponseDTO;
import com.cinebook.cinebook.entity.User;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponseDto>getMyProfile(){
        return ResponseEntity.ok(userService.getMyprofile());
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PutMapping("/update-profile")
    public ResponseEntity<UserProfileResponseDto>updateProfile(@Valid @RequestBody UpdateProfileRequestDto requestDto){
        return ResponseEntity.ok(userService.updateProfile(requestDto));
    }
     @PreAuthorize("hasRole('USER')")
    @PutMapping("/change-password")
   public ResponseEntity<String>changePassword(@Valid @RequestBody ChangePassword request){
        userService.changePassword(request);
        return ResponseEntity.ok("Password Change Successfully");
   }

   @PreAuthorize("hasAnyRole('USER','ADMIN')")
   @DeleteMapping("/delete-account")
   public ResponseEntity<String>deleteAccount(){
        userService.deleteAccount();
        return ResponseEntity.ok("Account Deleted Successfully");
   }


   //admin functionality
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/allactive")
    public ResponseEntity<List<UserResponseDTO>>getAllActiveUsers(){
        return  ResponseEntity.ok(userService.getAllActiveUsers());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{userid}/restore")
    public ResponseEntity<UserResponseDTO>restoreUser(@PathVariable Long userid){
        return  ResponseEntity.ok(userService.restoreUser(userid));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{userid}/delete")
    public ResponseEntity<String>deleteUser(@PathVariable Long userid){
        userService.deleteUserById(userid);
        return ResponseEntity.ok("User Deleted Successfully");
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{userid}/update")
    public ResponseEntity<UserResponseDTO>updateUserById(@PathVariable Long userid,@Valid @RequestBody AdminUpdateResponseDto responseDTO){
        return  ResponseEntity.ok(userService.updateUserById(userid,responseDTO));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{userid}/byuserid")
    public ResponseEntity<UserResponseDTO>getUserByid(@PathVariable Long userid){

        return ResponseEntity.ok(userService.getUsersById(userid));

    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/alldeleteuser")
    public ResponseEntity<List<UserResponseDTO>>getallDeletedUser(){
        return  ResponseEntity.ok(userService.getAllDeletedUsers());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<UserResponseDTO>>getAllUsers(){
        return  ResponseEntity.ok(userService.getAllUser());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/{Email}")
    public ResponseEntity<UserResponseDTO>searchUserByEmail(@PathVariable String Email){
        return  ResponseEntity.ok(userService.searchUserByEmail(Email));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/phone/{phone}")
    public ResponseEntity<UserResponseDTO>searchUserByphone(@PathVariable String phone){
        return  ResponseEntity.ok(userService.searchUserByPhone(phone));
    }
}



