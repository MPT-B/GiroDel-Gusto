package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.RestaurantCuisine;
import com.giroDelGusto.GiroDelGusto.services.RestaurantCuisineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantCuisineController {

    private final RestaurantCuisineService restaurantCuisineService;

    @Autowired
    public RestaurantCuisineController(RestaurantCuisineService restaurantCuisineService) {
        this.restaurantCuisineService = restaurantCuisineService;
    }

    @GetMapping("/restaurantCuisines")
    public List<RestaurantCuisine> getAllRestaurantCuisines() {
        return restaurantCuisineService.getAllRestaurantCuisines();
    }

    // Add other methods as needed
}