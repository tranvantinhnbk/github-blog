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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/sessions")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/")
    public ResponseEntity<String> createSessions(@Valid @RequestBody AuthDTO authDTO, HttpServletRequest request, HttpServletResponse response) {
        try {
            authService.login(authDTO,request, response);
        } catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<String>("User Registered successfully", HttpStatus.OK);
    }
}
