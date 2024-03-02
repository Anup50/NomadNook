package com.example.web_indi.service;

import java.util.List;
import java.util.Optional;

import com.example.web_indi.entity.User;
import com.example.web_indi.pojo.UserPojo;

public interface UserService {
    void saveUser(UserPojo userPojo);
    
    List<User> getAllData();

    Optional<User> getById(Long id);

    void deleteById(Long id);

    
}
