package com.example.web_indi.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import com.example.web_indi.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserPojo {

    private Long id;

    @NotEmpty(message = "Email can't be empty")
    private String email;

    @NotEmpty(message = "Full name can't be empty")
    private String fullname;


    @NotEmpty(message = "Password can't be empty")
    private String password;

    @NotEmpty(message = "Username can't be empty")
    private String username;

    public UserPojo(User user){
        this.id=user.getId();
        this.email=user.getEmail();
        this.fullname=user.getFullName();
        this.password=user.getPassword();
        this.username=user.getUsername();

    }
}

