package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.UserCuisinePreference;
import com.giroDelGusto.GiroDelGusto.services.UserCuisinePreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserCuisinePreferenceController {

    private final UserCuisinePreferenceService userCuisinePreferenceService;

    @Autowired
    public UserCuisinePreferenceController(UserCuisinePreferenceService userCuisinePreferenceService) {
        this.userCuisinePreferenceService = userCuisinePreferenceService;
    }

    @GetMapping("/userCuisinePreferences")
    public List<UserCuisinePreference> getAllUserCuisinePreferences() {
        return userCuisinePreferenceService.getAllUserCuisinePreferences();
    }

    // Add other methods as needed
}