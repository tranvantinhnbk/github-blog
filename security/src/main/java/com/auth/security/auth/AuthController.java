package com.auth.security.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/sessions")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<String> createSessions(@Valid @RequestBody AuthDTO authDTO, HttpServletRequest request, HttpServletResponse response) {
        authService.login(authDTO, request, response);
        return new ResponseEntity<String>("User log in successfully", HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteSessions(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }
}
