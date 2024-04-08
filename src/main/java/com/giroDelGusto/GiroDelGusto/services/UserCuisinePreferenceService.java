package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.UserCuisinePreference;
import com.giroDelGusto.GiroDelGusto.repositories.UserCuisinePreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCuisinePreferenceService {

    private final UserCuisinePreferenceRepository userCuisinePreferenceRepository;

    @Autowired
    public UserCuisinePreferenceService(UserCuisinePreferenceRepository userCuisinePreferenceRepository) {
        this.userCuisinePreferenceRepository = userCuisinePreferenceRepository;
    }

    public List<UserCuisinePreference> getAllUserCuisinePreferences() {
        return userCuisinePreferenceRepository.findAll();
    }

    // Add other methods as needed
}