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
public class UserService implements UserDeta{
    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;

    public void create(UserDTO userDTO) {
        String email = userDTO.getEmail().trim();
        //Check email in database
        Optional<UserEntity> exists = userRepo.findByPrincipal(email);

        if (exists.isPresent()) {
            throw new IllegalStateException(email + " exists");
        }

        UserEntity user = UserEntity.builder()
                .age(userDTO.getAge())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .phoneNumber(userDTO.getPhoneNumber())
                .build();

        userRepo.save(user);
    }

    public Optional<UserEntity> loadByUserEmail(String email) {
        return this.userRepo.findByPrincipal(email);
    }
}
