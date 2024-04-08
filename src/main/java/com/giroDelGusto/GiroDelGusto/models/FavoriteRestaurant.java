package com.giroDelGusto.GiroDelGusto.models;
import jakarta.persistence.*;
@Entity
@Table(name = "favorite_restaurants")
public class FavoriteRestaurant {
    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "restaurant_id")
    private Integer restaurantId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }
}