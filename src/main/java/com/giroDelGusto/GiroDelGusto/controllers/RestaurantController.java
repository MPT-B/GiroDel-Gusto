package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/favorite/{userId}")
    public List<Restaurant> getRestaurantsByFavorite(@PathVariable Integer userId) {
        return restaurantService.getRestaurantsByFavorite(userId);
    }

    @GetMapping("/cuisine/{cuisineTypeId}")
    public List<Restaurant> getRestaurantsByCuisine(@PathVariable Integer cuisineTypeId) {
        return restaurantService.getRestaurantsByCuisine(cuisineTypeId);
    }

    @PostMapping
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantService.addRestaurant(restaurant);
    }

    @GetMapping("/name/{name}")
    public Restaurant getRestaurantByName(@PathVariable String name) {
        return restaurantService.getRestaurantByName(name);
    }

    // Add other methods as needed
}