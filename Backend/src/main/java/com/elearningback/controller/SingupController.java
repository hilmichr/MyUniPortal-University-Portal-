package com.esprit.elearningback.controller;

import com.esprit.elearningback.dto.SignupRequest;
import com.esprit.elearningback.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/singup")
public class SingupController {
    private final AuthService authService;
 @Autowired
    public SingupController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/D-User")
    public ResponseEntity<String> sinupUser(@RequestBody SignupRequest signupRequest)
    {
        boolean isUserCreated = authService.createUser(signupRequest);
        if (isUserCreated)
        {
            return ResponseEntity.status(HttpStatus.CREATED).body("user created suc");

        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("faild");
        }




    }
}
