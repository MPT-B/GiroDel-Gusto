package com.giroDelGusto.GiroDelGusto.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "friendships")
public class Friendship implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friendship_id")
    private Integer friendshipId;

    @ManyToOne
    @JoinColumn(name = "member1_id")
    private User member1;

    @ManyToOne
    @JoinColumn(name = "member2_id")
    private User member2;

    public Integer getFriendshipId() {
        return friendshipId;
    }

    public void setFriendshipId(Integer friendshipId) {
        this.friendshipId = friendshipId;
    }

    public User getMember1() {
        return member1;
    }

    public void setMember1(User member1) {
        this.member1 = member1;
    }

    public User getMember2() {
        return member2;
    }

    public void setMember2(User member2) {
        this.member2 = member2;
    }
}