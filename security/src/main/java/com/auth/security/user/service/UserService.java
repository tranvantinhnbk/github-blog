package com.auth.security.user.service;
import com.auth.security.user.dto.UserDTO;
import com.auth.security.user.model.UserEntity;
import com.auth.security.user.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;

    public void create(UserDTO userDTO) {
        String email = userDTO.email().trim();
        //Check email in database
        Optional<UserEntity> exists = userRepo.findByPrincipal(email);

        if (exists.isPresent()) {
            throw new RuntimeException(email + " exists");
        }

        UserEntity user = UserEntity.builder()
                .age(userDTO.age())
                .email(userDTO.email())
                .password(passwordEncoder.encode(userDTO.password()))
                .phoneNumber(userDTO.phoneNumber())
                .build();

        userRepo.save(user);
    }

    public Optional<UserEntity> loadByUserEmail(String email) {
        return this.userRepo.findByPrincipal(email);
    }

}
