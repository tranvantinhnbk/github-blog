package com.auth.security.user.controller;

import com.auth.security.user.dto.UserDTO;
import com.auth.security.user.service.UserService;
import jakarta.validation.Valid;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/users")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @PostMapping("/")
    public void create(@Valid @RequestBody UserDTO userDTO) {
        userService.create(userDTO);
    };

}
