package com.pelisres.review;

import com.pelisres.movie.Movie;
import com.pelisres.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_pelicula", referencedColumnName = "id_pelicula", nullable = false)
    private Movie movie;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String texto;

    @Column(nullable = false)
    @Min(1)
    @Max(10)
    private int valoracion;

    @Column(nullable = false)
    private LocalDateTime fecha_creacion;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private User user;
}