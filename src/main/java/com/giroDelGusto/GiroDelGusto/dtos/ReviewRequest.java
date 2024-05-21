package com.giroDelGusto.GiroDelGusto.dtos;

public class ReviewRequest {
    private Integer userId;
    private Integer restaurantId;
    private Integer rating;
    private String comment;
    private String foodOrdered;

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

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getFoodOrdered() {
        return foodOrdered;
    }

    public void setFoodOrdered(String foodOrdered) {
        this.foodOrdered = foodOrdered;
    }
}
