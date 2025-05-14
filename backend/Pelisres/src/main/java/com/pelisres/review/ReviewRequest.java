package com.pelisres.review;

import lombok.Data;

@Data
public class ReviewRequest {
    private String id_pelicula;     
    private String titulo; 
    private String imagen_url;  
    private String descripcion_pelicula; 
    private String texto;            
    private int valoracion;          

}

