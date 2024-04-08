package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.RestaurantCuisine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantCuisineRepository extends JpaRepository<RestaurantCuisine, Integer> {
}