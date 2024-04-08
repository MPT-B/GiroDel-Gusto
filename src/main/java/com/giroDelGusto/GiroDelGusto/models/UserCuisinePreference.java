package com.giroDelGusto.GiroDelGusto.models;

import jakarta.persistence.*;
@Entity
@Table(name = "user_cuisine_preferences")
public class UserCuisinePreference {
    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "cuisine_id")
    private Integer cuisineId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCuisineId() {
        return cuisineId;
    }

    public void setCuisineId(Integer cuisineId) {
        this.cuisineId = cuisineId;
    }
}