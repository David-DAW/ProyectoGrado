package com.pelisres.review;

import lombok.Data;

@Data
public class ReviewResponse {
    private Integer id;
    private String usuarioNombre;
    private String texto;
    private int valoracion;
    private String fecha;
    private String tituloPelicula;
    private String imagenUrlPelicula;


    public ReviewResponse(Review review) {
    this.id = review.getId();
    this.usuarioNombre = review.getUser().getName();
    this.texto = review.getTexto();
    this.valoracion = review.getValoracion();
    this.fecha = review.getFecha_creacion().toString();
    this.tituloPelicula = review.getMovie().getTitulo();
    this.imagenUrlPelicula = review.getMovie().getImagenUrl();
}


}