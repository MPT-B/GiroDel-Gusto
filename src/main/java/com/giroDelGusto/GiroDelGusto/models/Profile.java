package com.giroDelGusto.GiroDelGusto.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String bio;

     @Column(name = "picture_path", nullable = false)
     private String picturePath = "public\\data\\default_profile_photo.jpg";

    @Column(name = "visited_places", nullable = false)
    private Long visitedPlaces = 0L;

    @OneToOne(mappedBy = "profile", cascade = CascadeType.ALL)
    @JsonBackReference
    private User user;


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

    public Integer getId() {
        return id;
    }
}