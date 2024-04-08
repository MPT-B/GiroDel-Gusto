package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.FavoriteRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRestaurantRepository extends JpaRepository<FavoriteRestaurant, Integer> {
}