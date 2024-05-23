package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.Location;
import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.models.Review;
import com.giroDelGusto.GiroDelGusto.repositories.LocationRepository;
import com.giroDelGusto.GiroDelGusto.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    @Autowired
    private LocationRepository locationRepository;

  @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;

    }

    public List<Restaurant> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        calculateAverageRating(restaurants);
        return restaurants;
    }

    public Restaurant getRestaurantById(Integer id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        Location location = restaurant.getLocation();
        location = locationRepository.save(location);
        restaurant.setLocation(location);
        System.out.println(location);
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
        List<Restaurant> restaurants = restaurantRepository.findByFavoriteRestaurantsUserId(userId);
        calculateAverageRating(restaurants);
        return restaurants;
    }

    public List<Restaurant> getRestaurantsByTown(String town) {
        List<Restaurant> restaurants = restaurantRepository.findByLocationCity(town);
        calculateAverageRating(restaurants);
        return restaurants;
    }
    public void calculateAverageRating(List<Restaurant> restaurants) {
        for (Restaurant restaurant : restaurants) {
            List<Review> reviews = restaurant.getReviews();
            if (!reviews.isEmpty()) {
                double sum = 0;
                for (Review review : reviews) {
                    sum += review.getRating();
                }
                double average = sum / reviews.size();
                restaurant.setAverageRating(average);
            }
        }
    }
}