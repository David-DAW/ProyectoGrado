package com.pelisRes.auth.controller;

public record RegisterRequest(
        String name,
        String email,
        String password
) {
}
