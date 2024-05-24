package com.giroDelGusto.GiroDelGusto.auth;
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

