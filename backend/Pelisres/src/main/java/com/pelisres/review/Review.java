package com.pelisres.review;
import com.pelisres.user.User;
import jakarta.persistence.*;
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

    @Column(name = "id_pelicula", nullable = false)
    private String peliculaId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String texto;

    @Column(nullable = false)
    private int valoracion;

    @Column(nullable = false)
    private LocalDateTime fecha_creacion;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private User user;
}

