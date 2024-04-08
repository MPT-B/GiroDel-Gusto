package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.VisitedPlace;
import com.giroDelGusto.GiroDelGusto.repositories.VisitedPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitedPlaceService {

    private final VisitedPlaceRepository visitedPlaceRepository;

    @Autowired
    public VisitedPlaceService(VisitedPlaceRepository visitedPlaceRepository) {
        this.visitedPlaceRepository = visitedPlaceRepository;
    }

    public List<VisitedPlace> getAllVisitedPlaces() {
        return visitedPlaceRepository.findAll();
    }

    // Add other methods as needed
}