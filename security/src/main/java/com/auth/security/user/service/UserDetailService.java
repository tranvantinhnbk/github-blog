package com.auth.security.user.service;

import com.auth.security.user.model.UserDetailEntity;
import com.auth.security.user.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service(value = "detailService")
public class UserDetailService implements UserDetailsService {
    final private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException, DataAccessException {
        return this.userRepo
                .findByPrincipal(email)
                .map(UserDetailEntity::new)
                .orElseThrow(() -> new UsernameNotFoundException(email + " not found"));
    }
}
