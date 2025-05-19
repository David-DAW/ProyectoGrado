package com.pelisres.review;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pelisres.movie.Movie;
import com.pelisres.user.User;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByMovie(Movie movie);

    List<Review> findByUser(User user);

    List<Review> findByMovie_IdPelicula(String idPelicula);


}