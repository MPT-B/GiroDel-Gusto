package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(Integer id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Integer id, Restaurant restaurantDetails) {
        Restaurant restaurant = restaurantRepository.findById(id).orElse(null);
        if (restaurant != null) {
            restaurant.setName(restaurantDetails.getName());
            restaurant.setLocation(restaurantDetails.getLocation());
            restaurant.setImagePath(restaurantDetails.getImagePath());
            restaurantRepository.save(restaurant);
        }
        return restaurant;
    }

    public void deleteRestaurant(Integer id) {
        restaurantRepository.deleteById(id);
    }

    public List<Restaurant> getRestaurantsByFavorite(Integer userId) {
        return restaurantRepository.findByFavoriteRestaurantsUserId(userId);
    }

    public List<Restaurant> getRestaurantsByTown(String town) {
        return restaurantRepository.findByLocationCityName(town);
    }

//    public List<Restaurant> getBestRestaurants() {
//        return restaurantRepository.findAll().stream()
//                .sorted(Comparator.comparing(Restaurant::getRating).reversed())
//                .collect(Collectors.toList());
//    }
}