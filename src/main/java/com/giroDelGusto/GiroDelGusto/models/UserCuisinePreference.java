// UserCuisinePreference.java
package com.giroDelGusto.GiroDelGusto.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "user_cuisine_preferences")
public class UserCuisinePreference implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "cuisine_id", insertable = false, updatable = false)
    private CuisineType cuisineType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public CuisineType getCuisineType() {
        return cuisineType;
    }

    public void setCuisineType(CuisineType cuisineType) {
        this.cuisineType = cuisineType;
    }
}