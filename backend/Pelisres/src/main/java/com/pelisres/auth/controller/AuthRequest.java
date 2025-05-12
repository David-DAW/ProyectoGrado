package com.pelisres.auth.controller;

public record AuthRequest(
        String email,
        String password
) {
}
