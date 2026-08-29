package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.auth.LoginRequestDTO;
import com.cinebook.cinebook.dto.auth.LoginResponseDTO;
import com.cinebook.cinebook.dto.request.ChangePassword;
import com.cinebook.cinebook.dto.request.UpdateProfileRequestDto;
import com.cinebook.cinebook.dto.request.UserRequestDTO;
import com.cinebook.cinebook.dto.response.AdminUpdateResponseDto;
import com.cinebook.cinebook.dto.response.UserProfileResponse.UserProfileResponseDto;
import com.cinebook.cinebook.dto.response.UserResponseDTO;
import com.cinebook.cinebook.entity.Role;
import com.cinebook.cinebook.entity.User;
import com.cinebook.cinebook.enums.UserStatus;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.mapper.UserMapper;
import com.cinebook.cinebook.repository.RoleRepository;
import com.cinebook.cinebook.repository.UserRepository;
import com.cinebook.cinebook.security.JwtService;
import com.cinebook.cinebook.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service

public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private  final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager,
                           UserMapper userMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userMapper=userMapper;
    }

    @Override
    public UserResponseDTO register(UserRequestDTO request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email is already exists");
        }
        Role role=roleRepository.findById(request.getRoleId())
                .orElseThrow(()->new RuntimeException("Role not found"));

        User user=new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail((request.getEmail()));
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setStatus(UserStatus.ACTIVE);
        User savedUser=userRepository.save(user);

//        UserResponseDTO response=UserResponseDTO.builder()
//                .id(savedUser.getId()).firstName(savedUser.getFirstName()).lastName(savedUser.getLastName()).password(savedUser.getPassword())
//                .phone(savedUser.getPhone()).email(savedUser.getEmail())
//                .role(savedUser.getRole().getName()).build();

        return userMapper.todtoadmin(savedUser);
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {
        //Authenticate user
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));
        //fetch user from databse
        User user=userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->
                        new ResourceNotFoundException("User not found"));
        String token=jwtService.generateToken(user); //token generation
        return LoginResponseDTO.builder()
                .token(token)
        .type("Bearer").email(user.getEmail())
                .role(user.getRole().getName()).message("Login Successful").build();

    }

    @Override
    public UserProfileResponseDto getMyprofile() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        return userMapper.todto(user);
    }

    @Override
    public UserProfileResponseDto updateProfile(UpdateProfileRequestDto requestDto) {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        user.setLastName(requestDto.getLastName());
        user.setFirstName(requestDto.getFirstName());
       user.setPhone(requestDto.getPhone());

        userRepository.save(user);
        return userMapper.todto(user);
    }

    @Override
    public void changePassword(ChangePassword request) {
          Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
          String email=authentication.getName();
          User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
          if(!passwordEncoder.matches(request.getOldPassword(),user.getPassword())){
              throw new RuntimeException("Old password is incorrect");
          }
          if(!request.getNewPassword().equals(request.getConfirmPassword())){
              throw  new RuntimeException("Password do not match");
          }
          user.setPassword(passwordEncoder.encode(request.getNewPassword()));
          userRepository.save(user);
    }

    @Override
    public void deleteAccount() {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        if(user.getStatus()!=UserStatus.DELETED){
            throw new RuntimeException("Account is already deleted");
        }
        user.setStatus(UserStatus.DELETED);
        userRepository.delete(user);

    }



    //admin functionality
    @Override
    public List<UserResponseDTO> getAllActiveUsers() {
        List<User>allusers=userRepository.findByStatus(UserStatus.ACTIVE);
        return allusers.stream().map(userMapper::todtoadmin).toList();

    }

    @Override
    public UserResponseDTO getUsersById(Long userid) {
        User user=userRepository.findById(userid).orElseThrow(()->new ResourceNotFoundException("user Not Found"));
        return  userMapper.todtoadmin(user);
    }

    @Override
    public UserResponseDTO updateUserById(Long userid, AdminUpdateResponseDto requestDTO) {
        User user=userRepository.findById(userid).orElseThrow(()->new ResourceNotFoundException("User Not Found with id:"+userid));
        //check email belongs to another user
        if(!user.getEmail().equals(requestDTO.getEmail())&&userRepository.findByEmail(requestDTO.getEmail()).isPresent()){
            throw new RuntimeException(
                    "Email is already used by another user"
            );
        }
        user.setFirstName(requestDTO.getFirstName());
        user.setLastName(requestDTO.getLastName());
        user.setEmail(requestDTO.getEmail());
        user.setPhone(requestDTO.getPhone());
        User updateuser=userRepository.save(user);

        return userMapper.todtoadmin(updateuser);
    }

    @Override
    public void deleteUserById(Long userid) {
        User user=userRepository.findById(userid).orElseThrow(()->new ResourceNotFoundException("User Not Found with Id:"+userid));
        if(user.getStatus()==UserStatus.DELETED){
            throw new RuntimeException("User is already Deleted");
        }
        user.setStatus(UserStatus.DELETED);
        userRepository.save(user);
    }

    @Override
    public UserResponseDTO restoreUser(Long userid) {
        User user=userRepository.findById(userid).orElseThrow(()->new ResourceNotFoundException("User Not Found with"+userid));
        if(user.getStatus()!=UserStatus.DELETED){
            throw  new RuntimeException("User is not Deleted");
        }
        user.setStatus(UserStatus.ACTIVE);
        User restoreuser=userRepository.save(user);
        return userMapper.todtoadmin(restoreuser);
    }

    @Override
    public List<UserResponseDTO> getAllDeletedUsers() {
        List<User>alldeleteuser=userRepository.findByStatus(UserStatus.DELETED);
        return  alldeleteuser.stream().map(userMapper::todtoadmin).toList();
    }

    @Override
    public List<UserResponseDTO> getAllUser() {
        List<User>alluser=userRepository.findAll();
        return alluser.stream().map(userMapper::todtoadmin).toList();
    }

    @Override
    public UserResponseDTO searchUserByEmail(String email) {
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        return userMapper.todtoadmin(user);
    }

    @Override
    public UserResponseDTO searchUserByPhone(String phone) {
        User user=userRepository.findByPhone(phone).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        return userMapper.todtoadmin(user);
    }


}

