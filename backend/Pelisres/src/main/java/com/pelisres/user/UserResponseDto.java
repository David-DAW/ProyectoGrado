package com.pelisres.user;

import java.time.LocalDateTime;

public record UserResponseDto(
    Integer id,
    String name,
    String email,
    String role,
    LocalDateTime registrationDate
) {}
