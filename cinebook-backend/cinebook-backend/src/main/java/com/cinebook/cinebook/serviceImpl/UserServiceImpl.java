package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.auth.LoginRequestDTO;
import com.cinebook.cinebook.dto.auth.LoginResponseDTO;
import com.cinebook.cinebook.dto.request.UserRequestDTO;
import com.cinebook.cinebook.dto.response.UserResponseDTO;
import com.cinebook.cinebook.entity.Role;
import com.cinebook.cinebook.entity.User;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.repository.RoleRepository;
import com.cinebook.cinebook.repository.UserRepository;
import com.cinebook.cinebook.security.JwtService;
import com.cinebook.cinebook.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private  final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
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
        User savedUser=userRepository.save(user);

        UserResponseDTO response=UserResponseDTO.builder()
                .id(savedUser.getId()).firstName(savedUser.getFirstName()).lastName(savedUser.getLastName()).password(savedUser.getPassword())
                .phone(savedUser.getPhone()).email(savedUser.getEmail())
                .role(savedUser.getRole().getName()).build();

        return response;
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
}
