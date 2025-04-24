package com.pelisRes.auth.controller;

public record AuthRequest(
        String email,
        String password
) {
}
