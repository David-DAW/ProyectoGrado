package com.pelisres.review;

import lombok.Data;

@Data
public class ReviewUpdateRequest {
    private String texto;
    private int valoracion;
}
