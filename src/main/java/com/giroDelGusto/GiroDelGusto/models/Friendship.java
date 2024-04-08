package com.giroDelGusto.GiroDelGusto.models;
import jakarta.persistence.*;
@Entity
@Table(name = "friendships")
public class Friendship {
    @Id
    @Column(name = "friendship_id")
    private Integer friendshipId;

    @Column(name = "member1_id")
    private Integer member1Id;

    @Column(name = "member2_id")
    private Integer member2Id;

    public Integer getFriendshipId() {
        return friendshipId;
    }

    public void setFriendshipId(Integer friendshipId) {
        this.friendshipId = friendshipId;
    }

    public Integer getMember1Id() {
        return member1Id;
    }

    public void setMember1Id(Integer member1Id) {
        this.member1Id = member1Id;
    }

    public Integer getMember2Id() {
        return member2Id;
    }

    public void setMember2Id(Integer member2Id) {
        this.member2Id = member2Id;
    }
}