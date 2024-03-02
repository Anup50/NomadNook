package com.example.web_indi.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.example.web_indi.config.PasswordEncoderUtil;
import org.springframework.stereotype.Service;

import com.example.web_indi.entity.User;
import com.example.web_indi.pojo.UserPojo;
import com.example.web_indi.repository.UserRepo;
import com.example.web_indi.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {

        private final UserRepo userRepo;
    @Override
    public void saveUser(UserPojo userPojo) {

        User user = new User();

        if(userPojo.getId()!=null){
            user=userRepo.findById(userPojo.getId())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }

        user.setFullName(userPojo.getFullname());
        user.setUsername(userPojo.getUsername());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userPojo.getPassword()));
        user.setEmail(userPojo.getEmail());
       


        userRepo.save(user);
    }

    @Override
    public List<User> getAllData() {
        return userRepo.findAll(); 
    }

    @Override
    public Optional<User> getById(Long id) {
        return userRepo.getUserById(id);
    }

    @Override
    public void deleteById(Long id) {
        userRepo.deleteById(id);
    }
}
