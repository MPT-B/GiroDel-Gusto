package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.CuisineType;
import com.giroDelGusto.GiroDelGusto.services.CuisineTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CuisineTypeController {

    private final CuisineTypeService cuisineTypeService;

    @Autowired
    public CuisineTypeController(CuisineTypeService cuisineTypeService) {
        this.cuisineTypeService = cuisineTypeService;
    }

    @GetMapping("/cuisineTypes")
    public List<CuisineType> getAllCuisineTypes() {
        return cuisineTypeService.getAllCuisineTypes();
    }

    // Add other methods as needed
}