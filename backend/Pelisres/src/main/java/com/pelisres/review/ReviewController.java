package com.pelisres.review;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

}
