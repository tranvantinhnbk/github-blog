package com.auth.security.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/test")
@AllArgsConstructor
public class TestController {
    private final AuthService authService;

    @GetMapping("")
    public String testEndpoint() {
        return "Hello, this is a test!";
    }
}
