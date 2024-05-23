package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.models.RestaurantCuisine;
import com.giroDelGusto.GiroDelGusto.repositories.RestaurantCuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantCuisineService {

    private final RestaurantCuisineRepository restaurantCuisineRepository;
    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantCuisineService(RestaurantCuisineRepository restaurantCuisineRepository, RestaurantService restaurantService) {
        this.restaurantCuisineRepository = restaurantCuisineRepository;
        this.restaurantService = restaurantService;
    }

    public List<RestaurantCuisine> getAllRestaurantCuisines() {
        return restaurantCuisineRepository.findAll();
    }

    public List<Restaurant> getRestaurantByCuisine(Integer cuisineTypeId) {
        List<Restaurant> restaurants = restaurantCuisineRepository.findRestaurantsByCuisineTypeId(cuisineTypeId);
        restaurantService.calculateAverageRating(restaurants);
        return restaurants;
    }
}