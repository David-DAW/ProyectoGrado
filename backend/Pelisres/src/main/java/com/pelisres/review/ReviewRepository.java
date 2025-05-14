package com.pelisres.review;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pelisres.movie.Movie;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByMovie(Movie movie);
}
