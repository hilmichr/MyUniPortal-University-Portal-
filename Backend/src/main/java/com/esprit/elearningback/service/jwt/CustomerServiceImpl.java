package com.esprit.elearningback.service.jwt;

import com.esprit.elearningback.entity.User;
import com.esprit.elearningback.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomerServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByUseremail(email)
                .orElseThrow(() -> new UsernameNotFoundException("user not found : " + email));
    }
}
