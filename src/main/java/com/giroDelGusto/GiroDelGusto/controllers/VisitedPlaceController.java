package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.VisitedPlace;
import com.giroDelGusto.GiroDelGusto.services.VisitedPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class VisitedPlaceController {

    private final VisitedPlaceService visitedPlaceService;

    @Autowired
    public VisitedPlaceController(VisitedPlaceService visitedPlaceService) {
        this.visitedPlaceService = visitedPlaceService;
    }

    @GetMapping("/visitedPlaces")
    public List<VisitedPlace> getAllVisitedPlaces() {
        return visitedPlaceService.getAllVisitedPlaces();
    }

}