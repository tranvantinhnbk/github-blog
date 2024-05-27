package com.auth.security.user.repository;

import com.auth.security.user.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long> {
    @Query("SELECT e FROM UserEntity e WHERE e.email = :email")
    Optional<UserEntity> findByPrincipal(@Param(value = "email") String email);
}