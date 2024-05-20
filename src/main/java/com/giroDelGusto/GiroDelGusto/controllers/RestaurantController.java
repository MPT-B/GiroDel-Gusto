package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.models.Review;
import com.giroDelGusto.GiroDelGusto.services.RestaurantService;
import com.giroDelGusto.GiroDelGusto.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final ReviewService reviewService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService, ReviewService reviewService) {
        this.restaurantService = restaurantService;
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{restaurantId}")
    public Restaurant getRestaurant(@PathVariable Integer restaurantId) {
        return restaurantService.getRestaurantById(restaurantId);
    }

    @PostMapping
    public Restaurant createRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantService.createRestaurant(restaurant);
    }

    @PutMapping("/{restaurantId}")
    public Restaurant updateRestaurant(@PathVariable Integer restaurantId, @RequestBody Restaurant restaurant) {
        return restaurantService.updateRestaurant(restaurantId, restaurant);
    }

    @DeleteMapping("/{restaurantId}")
    public void deleteRestaurant(@PathVariable Integer restaurantId) {
        restaurantService.deleteRestaurant(restaurantId);
    }

    @GetMapping("/{restaurantId}/reviews")
    public List<Review> getRestaurantReviews(@PathVariable Integer restaurantId) {
        return reviewService.getReviewsByRestaurantId(restaurantId);
    }

    @GetMapping("/town/{town}")
    public List<Restaurant> getRestaurantsByTown(@PathVariable String town) {
        return restaurantService.getRestaurantsByTown(town);
    }
}