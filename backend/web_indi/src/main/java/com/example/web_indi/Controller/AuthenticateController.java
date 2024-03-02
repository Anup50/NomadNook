package com.example.web_indi.Controller;

import com.example.web_indi.pojo.AuthenticateRequest;
import com.example.web_indi.pojo.AuthenticateResponse;
import com.example.web_indi.service.AuthenticateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthenticateController {
    private final AuthenticateService authenticateService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticateRequest authenticateRequest) {
        try {
            AuthenticateResponse response = authenticateService.authenticate(authenticateRequest);
            return ResponseEntity.ok(response); // Return successful response
        }  catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred"+ e.getMessage()); // Return generic error
        }
    }
}
