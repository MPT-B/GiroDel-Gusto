package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.Profile;
import com.giroDelGusto.GiroDelGusto.models.User;
import com.giroDelGusto.GiroDelGusto.repositories.ProfileRepository;
import com.giroDelGusto.GiroDelGusto.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    @Autowired
    public UserService(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public Profile updateProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public void addToVisitedPlaces(Integer userId) {
        Optional<Profile> profileOptional = profileRepository.findByUserId(userId);
        if (profileOptional.isPresent()) {
            Profile profile = profileOptional.get();
            profile.addToVisitedPlaces();
            profileRepository.save(profile);
        }
    }

    public void updateBio(Integer userId, String newBio) {
        Optional<Profile> profileOptional = profileRepository.findByUserId(userId);
        if (profileOptional.isPresent()) {
            Profile profile = profileOptional.get();
            profile.updateBio(newBio);
            profileRepository.save(profile);
        }
    }
}