package com.example.web_indi.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.web_indi.entity.User;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
        @Query(value = "select * from users where id=?1", nativeQuery = true)

        Optional<User> getUserById(Long id);
        Optional<User>  getUserByEmail(String email);


}
