package com.esprit.elearningback.service;

import com.esprit.elearningback.dto.SignupRequest;
import com.esprit.elearningback.entity.User;
import com.esprit.elearningback.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository ;
    private final PasswordEncoder passwordEncoder ;
    @Autowired

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public boolean createUser(SignupRequest signupRequest) {
        if (userRepository.existsByUseremail(signupRequest.getEmail())) {
            return false;
        }
        User user = new User();
        BeanUtils.copyProperties(signupRequest,user);
        String hashPasword = passwordEncoder.encode(signupRequest.getPassword());
        user.setPassword(hashPasword);
        userRepository.save(user);
        return true;
    }
}
