package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {
    List<Friendship> findByMember1IdOrMember2Id(Integer member1Id, Integer member2Id);
    Friendship save(Friendship friendship);
}