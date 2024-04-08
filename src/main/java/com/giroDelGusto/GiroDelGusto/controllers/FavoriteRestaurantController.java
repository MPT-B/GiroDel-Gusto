package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.FavoriteRestaurant;
import com.giroDelGusto.GiroDelGusto.services.FavoriteRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FavoriteRestaurantController {

    private final FavoriteRestaurantService favoriteRestaurantService;

    @Autowired
    public FavoriteRestaurantController(FavoriteRestaurantService favoriteRestaurantService) {
        this.favoriteRestaurantService = favoriteRestaurantService;
    }

    @GetMapping("/favoriteRestaurants")
    public List<FavoriteRestaurant> getAllFavoriteRestaurants() {
        return favoriteRestaurantService.getAllFavoriteRestaurants();
    }

    // Add other methods as needed
}