package com.example.web_indi.Controller;

import com.example.web_indi.entity.User;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.example.web_indi.pojo.UserPojo;
import com.example.web_indi.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;
    @PostMapping("/signup")
    public String signUp(@Valid @RequestBody UserPojo userPojo ) {
        userService.saveUser(userPojo);
        return "success";
    }
    @GetMapping("/getAll")
    public List<User> getAllData(){
        return userService.getAllData();
    }

    @GetMapping("/getById/{id}")
    public Optional<User> getUser(@PathVariable("id") Long id) {
        return userService.getById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        userService.deleteById(Long.valueOf(id));
    }
}
