package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.Restaurant;
import com.giroDelGusto.GiroDelGusto.models.RestaurantCuisine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantCuisineRepository extends JpaRepository<RestaurantCuisine, Integer> {
    @Query("SELECT rc.restaurant FROM RestaurantCuisine rc WHERE rc.cuisineType.id = :cuisineTypeId")
    List<Restaurant> findRestaurantsByCuisineTypeId(@Param("cuisineTypeId") Integer cuisineTypeId);
}