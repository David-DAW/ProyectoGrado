package com.pelisres.review;

import com.pelisres.user.User;
import com.pelisres.user.UserRepository;
import com.pelisres.movie.Movie;
import com.pelisres.movie.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    public List<ReviewResponse> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(ReviewResponse::new)
                .collect(Collectors.toList());
    }

    public List<ReviewResponse> getReviewsByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return reviewRepository.findByUser(user).stream()
                .map(ReviewResponse::new)
                .collect(Collectors.toList());
    }

    public List<ReviewResponse> getReviewsByMovie(String idPelicula) {
        return movieRepository.findByIdPelicula(idPelicula)
                .map(movie -> reviewRepository.findByMovie(movie).stream()
                        .map(ReviewResponse::new)
                        .collect(Collectors.toList()))
                .orElseGet(() -> List.of());
    }

    public ReviewResponse getReviewById(Integer id) {
        Review review = reviewRepository.findById(id)
                .orElse(null);
        return review != null ? new ReviewResponse(review) : null;
    }

    @Transactional
    public void saveReview(ReviewRequest request, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Movie movie = movieRepository.findByIdPelicula(request.getId_pelicula())
                .orElseGet(() -> {
                    Movie newMovie = new Movie();
                    newMovie.setIdPelicula(request.getId_pelicula());
                    newMovie.setTitulo(request.getTitulo());
                    newMovie.setImagenUrl(request.getImagen_url());
                    newMovie.setDescripcion(request.getDescripcion_pelicula());
                    return movieRepository.save(newMovie);
                });

        Review review = Review.builder()
                .texto(request.getTexto())
                .valoracion(request.getValoracion())
                .fecha_creacion(LocalDateTime.now())
                .user(user)
                .movie(movie)
                .build();

        reviewRepository.save(review);

    }

    public void deleteReview(Integer reviewId, String requesterEmail) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Reseña no encontrada"));

        User requester = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean isOwner = review.getUser().getEmail().equals(requesterEmail);
        boolean isAdmin = requester.getRole().name().equals("ADMIN");

        if (!isOwner && !isAdmin) {
            throw new RuntimeException("No tienes permiso para eliminar esta reseña");
        }

        reviewRepository.delete(review);
    }

    public Double getAverageRatingByMovie(String idPelicula) {
        Movie movie = movieRepository.findByIdPelicula(idPelicula)
                .orElseThrow(() -> new RuntimeException("Película no encontrada"));

        return reviewRepository.findAverageRatingByMovie(movie)
                .orElse(null);
    }

}