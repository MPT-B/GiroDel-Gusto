package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.CuisineType;
import com.giroDelGusto.GiroDelGusto.repositories.CuisineTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CuisineTypeService {

    private final CuisineTypeRepository cuisineTypeRepository;

    @Autowired
    public CuisineTypeService(CuisineTypeRepository cuisineTypeRepository) {
        this.cuisineTypeRepository = cuisineTypeRepository;
    }

    public List<CuisineType> getAllCuisineTypes() {
        return cuisineTypeRepository.findAll();
    }

    public CuisineType getCuisineTypeById(Integer cuisineTypeId) {
        return cuisineTypeRepository.findById(cuisineTypeId).orElse(null);
    }
}