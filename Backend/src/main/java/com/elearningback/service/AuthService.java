package com.esprit.elearningback.service;


import com.esprit.elearningback.dto.SignupRequest;

public interface AuthService {
    boolean createUser(SignupRequest signupRequest);
}
