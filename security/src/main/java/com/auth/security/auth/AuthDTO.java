package com.auth.security.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AuthDTO (
        @NotBlank(message = "Email cannot be blank")
        @NotNull(message = "Email cannot be null")
        @Email(message = "Email should be valid")
        String email,

        @NotBlank(message = "Password cannot be blank")
        @NotNull
        String password
) { }
