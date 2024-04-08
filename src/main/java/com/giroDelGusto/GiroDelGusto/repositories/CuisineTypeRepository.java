package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.CuisineType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CuisineTypeRepository extends JpaRepository<CuisineType, Integer> {
}