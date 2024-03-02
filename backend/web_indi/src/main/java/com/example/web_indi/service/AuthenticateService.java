package com.example.web_indi.service;

import com.example.web_indi.pojo.AuthenticateRequest;
import com.example.web_indi.pojo.AuthenticateResponse;

public interface AuthenticateService {

    AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest);
}
