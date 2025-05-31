package com.pelisres.review;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest request, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario no autenticado");
        }
        reviewService.saveReview(request, principal.getName());
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getAllReviews() {
        List<ReviewResponse> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyReviews(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario no autenticado");
        }

        List<ReviewResponse> myReviews = reviewService.getReviewsByUser(principal.getName());
        return ResponseEntity.ok(myReviews);
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByMovie(@PathVariable String id) {
        List<ReviewResponse> reviews = reviewService.getReviewsByMovie(id);
        return ResponseEntity.ok(reviews);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Integer id, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario no autenticado");
        }

        try {
            reviewService.deleteReview(id, principal.getName());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable Integer id) {
        ReviewResponse review = reviewService.getReviewById(id);
        if (review == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(review);
    }

    @GetMapping("/movie/{id}/average-rating")
    public ResponseEntity<Double> getAverageRating(@PathVariable String id) {
        Double averageRating = reviewService.getAverageRatingByMovie(id);
        if (averageRating == null) {
            return ResponseEntity.ok(0.0);
        }
        return ResponseEntity.ok(averageRating);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Integer id, @RequestBody ReviewUpdateRequest request,
            Principal principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario no autenticado");
        }

        try {
            reviewService.updateReview(id, request, principal.getName());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

}