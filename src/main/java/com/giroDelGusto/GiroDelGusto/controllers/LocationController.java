package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.Location;
import com.giroDelGusto.GiroDelGusto.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/locations")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }
}