package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.models.RestaurantCuisine;
import com.giroDelGusto.GiroDelGusto.services.RestaurantCuisineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/restaurantCuisines/{restaurantCuisineId}")
    public List<Restaurant> getRestaurantByCuisine(@PathVariable Integer restaurantCuisineId) {
        return restaurantCuisineService.getRestaurantByCuisine(restaurantCuisineId);
    }

}