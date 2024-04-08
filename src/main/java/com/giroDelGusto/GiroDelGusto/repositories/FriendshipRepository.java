package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {
}