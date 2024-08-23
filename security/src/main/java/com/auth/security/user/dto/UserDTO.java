package com.auth.security.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

import lombok.*;

import org.springframework.validation.annotation.Validated;

import org.hibernate.validator.constraints.Range;

@Builder
@Validated
public record UserDTO(
        @NotBlank(message = "Email cannot be blank")
        @NotNull(message = "Email cannot be null")
        @Email(message = "Email should be valid")
        String email,

        @NotBlank(message = "Password cannot be blank")
        String password,

        @Pattern(regexp = "^$|^\\+(?:[0-9] ?){6,14}[0-9]$", message = "Invalid phone number format")
        @JsonProperty("phone_number")
        String phoneNumber,

        @NotNull(message = "Age cannot be null")
        @Range(min = 1, message = "Age must be positive")
        Integer age
) {}
