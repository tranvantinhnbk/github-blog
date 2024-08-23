package com.auth.security.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final AuthenticationManager authManager;
    private final SecurityContextHolderStrategy strategy = SecurityContextHolder.getContextHolderStrategy();
    private final SecurityContextRepository repository;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public void login(AuthDTO dto, HttpServletRequest request, HttpServletResponse response) {
        logger.info("authenticate account");
        Authentication authentication = authManager.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(
                dto.email().trim(), dto.password()
        ));


        //New context
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);

        this.strategy.setContext(context);
        this.repository.saveContext(context, request, response);
    }

}
