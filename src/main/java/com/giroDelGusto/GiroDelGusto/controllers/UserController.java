package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.User;
import com.giroDelGusto.GiroDelGusto.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Pobieranie użytkownika po UUID
    @GetMapping("/{userId}")
    public String getUser(@PathVariable UUID userId) {
        // Tutaj logika do pobrania użytkownika z bazy danych używając userId
        return "User with ID: " + userId;
    }

    // Tworzenie nowego użytkownika
    @PostMapping
    public String createUser() {
        // Logika do tworzenia nowego użytkownika
        return "User created";
    }

    // Aktualizacja użytkownika
    @PutMapping("/{userId}")
    public String updateUser(@PathVariable UUID userId) {
        // Logika do aktualizacji użytkownika
        return "User with ID: " + userId + " updated";
    }

    // Usuwanie użytkownika
    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable UUID userId) {
        // Logika do usunięcia użytkownika
        return "User with ID: " + userId + " deleted";
    }
}
