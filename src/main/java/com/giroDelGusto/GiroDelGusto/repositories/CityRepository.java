package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Integer> {
}