package com.giroDelGusto.GiroDelGusto.controllers;

import com.giroDelGusto.GiroDelGusto.dtos.ReviewRequest;
import com.giroDelGusto.GiroDelGusto.kafka.KafkaProducer;
import com.giroDelGusto.GiroDelGusto.models.Review;
import com.giroDelGusto.GiroDelGusto.services.RestaurantService;
import com.giroDelGusto.GiroDelGusto.services.ReviewService;
import com.giroDelGusto.GiroDelGusto.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    public ReviewController(ReviewService reviewService, KafkaProducer kafkaProducer) {
        this.reviewService = reviewService;
        this.kafkaProducer = kafkaProducer;
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/user/{userId}")
    public List<Review> getReviewsByUserId(@PathVariable Integer userId) {
        return reviewService.getReviewsByUserId(userId);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<Review> getReviewsByRestaurantId(@PathVariable Integer restaurantId) {
        return reviewService.getReviewsByRestaurantId(restaurantId);
    }

    @PostMapping("/add")
    public Review addReview(@RequestBody ReviewRequest reviewRequest) {
        Review review = new Review();
        review.setUser(userService.getUserById(reviewRequest.getUserId()));
        review.setRestaurant(restaurantService.getRestaurantById(reviewRequest.getRestaurantId()));
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());
        review.setDateAdded(new Timestamp(System.currentTimeMillis()));
        review.setFoodOrdered(reviewRequest.getFoodOrdered());

        Review savedReview = reviewService.addReview(review);

        kafkaProducer.sendMessage("reviews",  savedReview.getId() +":new review added");

        return savedReview;
    }

    @PutMapping
    public Review editReview(@RequestBody Review review) {
        Review savedReview = reviewService.updateReview(review);
        kafkaProducer.sendMessage("reviews", "Edited Review ID: " + savedReview.getId());

        return savedReview;
    }

    @DeleteMapping("/remove/{id}")
    public void deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        kafkaProducer.sendMessage("reviews", "Deleted Review:deleted ");
    }

    @GetMapping("/friends/{userId}")
    public List<Review> getReviewsByFriends(@PathVariable Integer userId) {
        return reviewService.getReviewsByFriends(userId);
    }

    @GetMapping("/test")
    public void getTest() {
        this.kafkaProducer = kafkaProducer;
        kafkaProducer.sendMessage("reviews", "succes:succes");
    }
}