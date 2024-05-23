package com.giroDelGusto.GiroDelGusto.services;

import com.giroDelGusto.GiroDelGusto.models.Review;
import com.giroDelGusto.GiroDelGusto.models.User;
import com.giroDelGusto.GiroDelGusto.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final FriendshipService friendshipService;


    @Autowired
    public ReviewService(ReviewRepository reviewRepository, FriendshipService friendshipService) {
        this.reviewRepository = reviewRepository;
         this.friendshipService = friendshipService;

    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getReviewsByUserId(Integer userId) {
        return reviewRepository.findByUserId(userId);
    }

    public List<Review> getReviewsByRestaurantId(Integer restaurantId) {
        return reviewRepository.findByRestaurantId(restaurantId);
    }

    public List<Review> getReviewsByFriends(Integer userId) {
        Set<User> friends = friendshipService.getFriendsByUserId(userId);
        List<Review> reviews = new ArrayList<>();
        for (User friend : friends) {
            reviews.addAll(reviewRepository.findByUserId(friend.getId()));
        }
        return reviews;
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(Integer id) {
        reviewRepository.deleteById(id);
    }
}