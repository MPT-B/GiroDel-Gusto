package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.RestaurantCuisine;
import com.giroDelGusto.GiroDelGusto.repositories.RestaurantCuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantCuisineService {

    private final RestaurantCuisineRepository restaurantCuisineRepository;

    @Autowired
    public RestaurantCuisineService(RestaurantCuisineRepository restaurantCuisineRepository) {
        this.restaurantCuisineRepository = restaurantCuisineRepository;
    }

    public List<RestaurantCuisine> getAllRestaurantCuisines() {
        return restaurantCuisineRepository.findAll();
    }

    // Add other methods as needed
}