package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.Friendship;
import com.giroDelGusto.GiroDelGusto.models.User;
import com.giroDelGusto.GiroDelGusto.repositories.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository) {
        this.friendshipRepository = friendshipRepository;
    }

    public List<Friendship> getAllFriendships() {
        return friendshipRepository.findAll();
    }

    public Set<User> getFriendsByUserId(Integer userId) {
        List<Friendship> friendships = friendshipRepository.findByMember1IdOrMember2Id(userId, userId);
        Set<User> friends = new HashSet<>();
        for (Friendship friendship : friendships) {
            if (friendship.getMember1().getId().equals(userId)) {
                friends.add(friendship.getMember2());
            } else {
                friends.add(friendship.getMember1());
            }
        }
        return friends;
    }

    // Add other methods as needed
}