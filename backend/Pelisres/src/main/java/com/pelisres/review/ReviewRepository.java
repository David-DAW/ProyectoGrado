package com.pelisres.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pelisres.movie.Movie;
import com.pelisres.user.User;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByMovie(Movie movie);

    List<Review> findByUser(User user);

    List<Review> findByMovie_IdPelicula(String idPelicula);

    @Query("SELECT AVG(r.valoracion) FROM Review r WHERE r.movie = :movie")
    Optional<Double> findAverageRatingByMovie(@Param("movie") Movie movie);

    

}