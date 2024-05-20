package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.FavoriteRestaurant;
import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.services.FavoriteRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favoriteRestaurants")
public class FavoriteRestaurantController {

    @Autowired
    private FavoriteRestaurantService favoriteRestaurantService;

    @PostMapping("/add")
    public FavoriteRestaurant addFavoriteRestaurant(@RequestParam Integer userId, @RequestParam Integer restaurantId) {
        return favoriteRestaurantService.addFavoriteRestaurant(userId, restaurantId);
    }

    @GetMapping("/user/{userId}")
    public List<Restaurant> getFavoriteRestaurantsByUserId(@PathVariable Integer userId) {
        return favoriteRestaurantService.getFavoriteRestaurantsByUserId(userId);
    }

    @DeleteMapping("/remove")
    public void removeFavoriteRestaurant(@RequestParam Integer userId, @RequestParam Integer restaurantId) {
        favoriteRestaurantService.removeFavoriteRestaurant(userId, restaurantId);
    }
}