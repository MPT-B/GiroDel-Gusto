package com.giroDelGusto.GiroDelGusto.models;

import jakarta.persistence.*;

@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column
    private String bio;

    @Column(name = "picture_path", nullable = false)
    private String picturePath = "public\\data\\default_profile_photo.jpg";

    @Column(name = "visited_places", nullable = false)
    private Long visitedPlaces = 0L;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPicturePath() {
        return picturePath;
    }

    public void setPicturePath(String picturePath) {
        this.picturePath = picturePath;
    }

    public Long getVisitedPlaces() {
        return visitedPlaces;
    }

    public void setVisitedPlaces(Long visitedPlaces) {
        this.visitedPlaces = visitedPlaces;
    }

    public void addToVisitedPlaces() {
        this.visitedPlaces++;
    }

    public void updateBio(String newBio) {
        this.bio = newBio;
    }
}