package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    List<Restaurant> findByFavoriteRestaurantsUserId(Integer userId);
    List<Restaurant> findByRestaurantCuisinesCuisineTypeId(Integer cuisineTypeId);
    Restaurant findByName(String name);
}