package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.models.Friendship;
import com.giroDelGusto.GiroDelGusto.models.User;
import com.giroDelGusto.GiroDelGusto.services.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
public class FriendshipController {

    private final FriendshipService friendshipService;

    @Autowired
    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @GetMapping("/friendships")
    public List<Friendship> getAllFriendships() {
        return friendshipService.getAllFriendships();
    }

    @GetMapping("/friends/user/{userId}")
    public Set<User> getFriendsByUserId(@PathVariable Integer userId) {
        return friendshipService.getFriendsByUserId(userId);
    }

    @PostMapping("/friends/{userId}/{friendId}")
    public Friendship addFriend(@PathVariable Integer userId, @PathVariable Integer friendId) {
        return friendshipService.addFriend(userId, friendId);
    }
}