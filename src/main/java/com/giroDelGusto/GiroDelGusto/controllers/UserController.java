package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.auth.SignupRequest;
import com.giroDelGusto.GiroDelGusto.dtos.UserDto;
import com.giroDelGusto.GiroDelGusto.models.Friendship;
import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.models.Review;
import com.giroDelGusto.GiroDelGusto.models.User;
import com.giroDelGusto.GiroDelGusto.services.RestaurantService;
import com.giroDelGusto.GiroDelGusto.services.ReviewService;
import com.giroDelGusto.GiroDelGusto.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final ReviewService reviewService;
    private final RestaurantService restaurantService;

    @Autowired
    public UserController(UserService userService, ReviewService reviewService, RestaurantService restaurantService) {
        this.userService = userService;
        this.reviewService = reviewService;
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable Integer userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/username/{username}")
    public List<UserDto> getUsersByUsername(@PathVariable String username) {
        return userService.getUsersByUsername(username);
    }


    @PostMapping
    public User createUser(@RequestBody SignupRequest signupRequest) {
        return userService.createUser(signupRequest);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Integer userId, @RequestBody User user) {
        return userService.updateUser(userId, user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
    }

    @GetMapping("/{userId}/reviews")
    public List<Review> getUserReviews(@PathVariable Integer userId) {
        return reviewService.getReviewsByUserId(userId);
    }

    @GetMapping("/{userId}/favoriteRestaurants")
    public List<Restaurant> getUserFavoriteRestaurants(@PathVariable Integer userId) {
        return restaurantService.getRestaurantsByFavorite(userId);
    }

    @PutMapping("/{userId}/username-password")
    public User updateUsernameAndPassword(@PathVariable Integer userId, @RequestBody User updatedUser) {
        return userService.updateUsernameAndPassword(userId, updatedUser.getUsername(), updatedUser.getPassword());
    }

    @PutMapping("/{userId}/profile")
    public User updateProfile(@PathVariable Integer userId, @RequestBody User updatedUser) {
        return userService.updateProfile(userId, updatedUser);
    }

    @PostMapping("/{userId}/friends/{friendId}")
    public Friendship addFriend(@PathVariable Integer userId, @PathVariable Integer friendId) {
        return userService.addFriend(userId, friendId);
    }

    @GetMapping("/me")
    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDto) {
            UserDto userDto = (UserDto) authentication.getPrincipal();
            String currentUserName = userDto.getUsername();

            return userService.getUserByUsername(currentUserName);
        } else {
            throw new RuntimeException("Authentication principal is not of type UserDto");
        }
    }
}
