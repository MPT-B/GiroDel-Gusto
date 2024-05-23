package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.auth.SignupRequest;
import com.giroDelGusto.GiroDelGusto.dtos.UserDto;
import com.giroDelGusto.GiroDelGusto.exceptions.AppException;
import com.giroDelGusto.GiroDelGusto.mappers.UserMapper;
import com.giroDelGusto.GiroDelGusto.models.*;
import com.giroDelGusto.GiroDelGusto.repositories.FriendshipRepository;
import com.giroDelGusto.GiroDelGusto.repositories.ProfileRepository;
import com.giroDelGusto.GiroDelGusto.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final FriendshipRepository friendshipRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    private final UserMapper userMapper;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(signupRequest.getPassword()));
        return userRepository.save(user);
    }

    public UserDto login(Credentials credentialsDto) {
        User user = userRepository.findByUsername(credentialsDto.getUsername())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (bCryptPasswordEncoder.matches(new String(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUp userDto) {
        Optional<User> optionalUser = userRepository.findByUsername(userDto.getUsername());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        // Create a new profile with default values
        Profile profile = new Profile();
        profile.setBio("New to Grio");
        profile.setPicturePath("public\\data\\default_profile_photo.jpg");
        profile.setVisitedPlaces(0L);

        // Save the profile
        Profile savedProfile = profileRepository.save(profile);

        User user = userMapper.signUpToUser(userDto);
        user.setRole(UserRole.normal);
        user.setProfileId(savedProfile.getId()); // Set the user's profile ID to be the same as the profile ID

        user.setPassword(bCryptPasswordEncoder.encode(new String(userDto.getPassword())));

        // Save the user
        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }

    public User updateUser(Integer id, User userDetails) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setEmail(userDetails.getEmail());
            user.setUsername(userDetails.getUsername());
            user.setPassword(userDetails.getPassword());
            user.setRole(userDetails.getRole());
            userRepository.save(user);
        }
        return user;
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
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


    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new Error("User not found"));
        return userMapper.toUserDto(user);
    }

    public User updateProfile(Integer userId, User updatedUser) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setUsername(updatedUser.getUsername());
            user.getProfile().setBio(updatedUser.getProfile().getBio());
            userRepository.save(user);
        }
        return user;
    }

    public User updatePassword(Integer userId, String newPassword) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setPassword(bCryptPasswordEncoder.encode(newPassword));
            userRepository.save(user);
        }
        return user;
    }

    public User updateUsernameAndPassword(Integer userId, String newUsername, String newPassword) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setUsername(newUsername);
            user.setPassword(bCryptPasswordEncoder.encode(newPassword));
            userRepository.save(user);
        }
        return user;
    }

    public Friendship addFriend(Integer userId, Integer friendId) {
        User user = userRepository.findById(userId).orElse(null);
        User friend = userRepository.findById(friendId).orElse(null);
        if (user != null && friend != null) {
            Friendship friendship = new Friendship();
            friendship.setMember1(user);
            friendship.setMember2(friend);
            friendshipRepository.save(friendship);
            return friendship;
        }
        return null;
    }
}