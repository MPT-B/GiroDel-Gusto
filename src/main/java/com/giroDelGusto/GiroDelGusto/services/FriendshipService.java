package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.Friendship;
import com.giroDelGusto.GiroDelGusto.models.User;
import com.giroDelGusto.GiroDelGusto.repositories.FriendshipRepository;
import com.giroDelGusto.GiroDelGusto.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository, UserRepository userRepository) {
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
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

    public Friendship addFriend(Integer userId, Integer friendId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User friend = userRepository.findById(friendId).orElseThrow(() -> new RuntimeException("User not found"));
        Friendship friendship = new Friendship();
        friendship.setMember1(user);
        friendship.setMember2(friend);
        return friendshipRepository.save(friendship);
    }
}