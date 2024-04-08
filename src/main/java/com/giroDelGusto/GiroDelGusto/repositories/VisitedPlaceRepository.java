package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.VisitedPlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitedPlaceRepository extends JpaRepository<VisitedPlace, Integer> {
}