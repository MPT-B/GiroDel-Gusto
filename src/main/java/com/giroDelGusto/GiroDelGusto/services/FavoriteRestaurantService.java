package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.FavoriteRestaurant;
import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.models.User;
import com.giroDelGusto.GiroDelGusto.repositories.FavoriteRestaurantRepository;
import com.giroDelGusto.GiroDelGusto.repositories.RestaurantRepository;
import com.giroDelGusto.GiroDelGusto.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteRestaurantService {

    private final FavoriteRestaurantRepository favoriteRestaurantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    public FavoriteRestaurantService(FavoriteRestaurantRepository favoriteRestaurantRepository) {
        this.favoriteRestaurantRepository = favoriteRestaurantRepository;
    }

    public List<FavoriteRestaurant> getAllFavoriteRestaurants() {
        return favoriteRestaurantRepository.findAll();
    }

    public FavoriteRestaurant addFavoriteRestaurant(Integer userId, Integer restaurantId) {
        FavoriteRestaurant favoriteRestaurant = new FavoriteRestaurant();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        favoriteRestaurant.setUser(user);
        favoriteRestaurant.setRestaurant(restaurant);
        return favoriteRestaurantRepository.save(favoriteRestaurant);
    }

    public List<Restaurant> getFavoriteRestaurantsByUserId(Integer userId) {
        return favoriteRestaurantRepository.findAll().stream()
                .filter(favoriteRestaurant -> favoriteRestaurant.getUser().getId().equals(userId))
                .map(FavoriteRestaurant::getRestaurant)
                .collect(Collectors.toList());
    }

    public void removeFavoriteRestaurant(Integer userId, Integer restaurantId) {
        FavoriteRestaurant favoriteRestaurant = favoriteRestaurantRepository.findAll().stream()
                .filter(fr -> fr.getUser().getId().equals(userId) && fr.getRestaurant().getId().equals(restaurantId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Favorite restaurant not found"));
        favoriteRestaurantRepository.delete(favoriteRestaurant);
    }
}