package com.giroDelGusto.GiroDelGusto.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "location_id", insertable = false, updatable = false)
    private Location location;

    @Column(name = "image_path")
    private String imagePath;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant")
    private List<FavoriteRestaurant> favoriteRestaurants;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant")
    private List<Review> reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant")
    private List<VisitedPlace> visitedPlaces;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant")
    private List<RestaurantCuisine> restaurantCuisines;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public List<FavoriteRestaurant> getFavoriteRestaurants() {
        return favoriteRestaurants;
    }

    public void setFavoriteRestaurants(List<FavoriteRestaurant> favoriteRestaurants) {
        this.favoriteRestaurants = favoriteRestaurants;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<VisitedPlace> getVisitedPlaces() {
        return visitedPlaces;
    }

    public void setVisitedPlaces(List<VisitedPlace> visitedPlaces) {
        this.visitedPlaces = visitedPlaces;
    }

    public List<RestaurantCuisine> getRestaurantCuisines() {
        return restaurantCuisines;
    }

    public void setRestaurantCuisines(List<RestaurantCuisine> restaurantCuisines) {
        this.restaurantCuisines = restaurantCuisines;
    }
}