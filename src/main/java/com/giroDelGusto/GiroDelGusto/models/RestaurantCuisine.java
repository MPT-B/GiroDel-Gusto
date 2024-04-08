package com.giroDelGusto.GiroDelGusto.models;
import jakarta.persistence.*;

@Entity
@Table(name = "restaurant_cuisines")
public class RestaurantCuisine {
    @Id
    @Column(name = "restaurant_id")
    private Integer restaurantId;

    @Column(name = "cuisine_type_id")
    private Integer cuisineTypeId;

    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Integer getCuisineTypeId() {
        return cuisineTypeId;
    }

    public void setCuisineTypeId(Integer cuisineTypeId) {
        this.cuisineTypeId = cuisineTypeId;
    }
}
