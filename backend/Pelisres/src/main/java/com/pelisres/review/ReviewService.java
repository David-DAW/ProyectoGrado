package com.pelisres.review;

import com.pelisres.user.User;
import com.pelisres.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public void saveReview(ReviewRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Review review = Review.builder()
                .peliculaId(request.getId_pelicula())
                .texto(request.getTexto())
                .valoracion(request.getValoracion())
                .fecha_creacion(LocalDateTime.now())
                .user(user)
                .build();

        reviewRepository.save(review);
    }
}
