// RestaurantCuisine.java
package com.giroDelGusto.GiroDelGusto.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "restaurant_cuisines")
public class RestaurantCuisine implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", insertable = false, updatable = false)
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "cuisine_type_id", insertable = false, updatable = false)
    private CuisineType cuisineType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public CuisineType getCuisineType() {
        return cuisineType;
    }

    public void setCuisineType(CuisineType cuisineType) {
        this.cuisineType = cuisineType;
    }
}