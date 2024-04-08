package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.FavoriteRestaurant;
import com.giroDelGusto.GiroDelGusto.repositories.FavoriteRestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteRestaurantService {

    private final FavoriteRestaurantRepository favoriteRestaurantRepository;

    @Autowired
    public FavoriteRestaurantService(FavoriteRestaurantRepository favoriteRestaurantRepository) {
        this.favoriteRestaurantRepository = favoriteRestaurantRepository;
    }

    public List<FavoriteRestaurant> getAllFavoriteRestaurants() {
        return favoriteRestaurantRepository.findAll();
    }

    // Add other methods as needed
}