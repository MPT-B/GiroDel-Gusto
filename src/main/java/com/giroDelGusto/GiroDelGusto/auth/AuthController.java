package com.giroDelGusto.GiroDelGusto.auth;
//
//import com.giroDelGusto.GiroDelGusto.services.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//
//@Controller
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//    @Autowired
//    private JwtUtil jwtUtil;
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
//        );
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
//        final String jwt = jwtUtil.generateToken(userDetails);
//        return ResponseEntity.ok(new JwtResponse(jwt));
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
//        com.giroDelGusto.GiroDelGusto.models.User newUser = userService.createUser(signupRequest);
//        UserDetails userDetails = new org.springframework.security.core.userdetails.User(newUser.getUsername(), newUser.getPassword(), new ArrayList<>());
//        return ResponseEntity.ok(userDetails);
//    }
//}

import com.giroDelGusto.GiroDelGusto.config.UserAuthenticationProvider;
import com.giroDelGusto.GiroDelGusto.dtos.UserDto;
import com.giroDelGusto.GiroDelGusto.exceptions.AppException;
import com.giroDelGusto.GiroDelGusto.models.Credentials;
import com.giroDelGusto.GiroDelGusto.models.SignUp;
import com.giroDelGusto.GiroDelGusto.models.User;
import com.giroDelGusto.GiroDelGusto.repositories.UserRepository;
import com.giroDelGusto.GiroDelGusto.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid Credentials credentialsDto) {
        try {
            UserDto userDto = userService.login(credentialsDto);
            userDto.setToken(userAuthenticationProvider.createToken(userDto));
            return ResponseEntity.ok(userDto);
        } catch (AppException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(e.getStatus()).body(errorResponse);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody @Valid SignUp user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Username already exists");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        Optional<User> existingEmail = userRepository.findByEmail(user.getEmail());
        if (existingEmail.isPresent()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Email already exists");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

}

