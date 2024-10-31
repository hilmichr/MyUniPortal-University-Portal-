package com.esprit.elearningback.controller;

import com.esprit.elearningback.dto.LoginRequest;
import com.esprit.elearningback.dto.LoginResponse;
import com.esprit.elearningback.dto.PasswordUpdateRequest;
import com.esprit.elearningback.entity.User;
import com.esprit.elearningback.service.IUserService;
import com.esprit.elearningback.service.JwtBlacklistService;
import com.esprit.elearningback.service.jwt.CustomerServiceImpl;
import com.esprit.elearningback.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin("*")
public class UserRestController {
    private IUserService userSe;
    private CustomerServiceImpl customerService;
    private JwtUtil jwtUtil;
    private  AuthenticationManager authenticationManager;



    // http://localhost:8089/projetpi/User/retrieve-all-Users
    @GetMapping("/retrieve-all-Users")
    public List<User> getUsers() {
        List<User> listUsers = userSe.retrieveAllUsers();
        return listUsers;
    }

    // http://localhost:8089/projetpi/User/retrieve-User/8
    @GetMapping("/retrieve-User/{User-id}")
    public User retrieveUser(@PathVariable("User-id") Long chId) {
        User User = userSe.retrieveUser(chId);
        return User;
    }

    // http://localhost:8089/projetpi/User/add-User
    @PostMapping("/add-User")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        try {
            User savedUser = userSe.addUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // http://localhost:8089/projetpi/User/remove-User/{User-id}
    @DeleteMapping("/remove-User/{User-id}")
    public void removeUser(@PathVariable("User-id") Long chId) {
        userSe.removeUser(chId);
    }

    // http://localhost:8089/projetpi/User/modify-User
    @PutMapping("/modify-User")
    public User modifyUser(@RequestBody User c) {
        User User = userSe.modifyUser(c);
        return User;
    }

    @PutMapping("/modify-etat-User")
    public User modifyEtatUser(@RequestParam("userId") Long userId,
                               @RequestParam("etat") boolean etat) {
        User User = userSe.modifyEtatUser(userId,etat);
        return User;
    }

    @GetMapping("/fin/{useremail}")
    public ResponseEntity<User> getUserByUseremail(@PathVariable String useremail) {
        Optional<User> user = userSe.findByUseremail(useremail);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            // Log the authentication failure
            System.err.println("Authentication chy: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDetails userDetails;
        try {
            userDetails = customerService.loadUserByUsername(loginRequest.getEmail());

        } catch (UsernameNotFoundException e) {
            // Log the user not found exception
            System.err.println("User not found: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Generate JWT token
        User user = (User) userDetails;
        if (!user.getUseretat()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Your account is disabled. Contact admin."));
        }
        String jwt = jwtUtil.generateToken(userDetails);
        System.out.println("user role: " + userDetails.getAuthorities());
        System.out.println("token" + jwt);

        return ResponseEntity.ok(new LoginResponse(jwt));
    }

    private JwtBlacklistService jwtBlacklistService;
    @PostMapping("/logout/{token}")
    public ResponseEntity<Void> logout(@PathVariable("token") String jwt) {
        jwtBlacklistService.add(jwt);

        SecurityContextHolder.clearContext();

        return ResponseEntity.ok().build();
    }

    @GetMapping("/statUsersByRole")
    public Map<String, Integer> getStatUsersByRole() {
        return userSe.statUsersByRole();
    }

    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        boolean isUpdated = userSe.updatePassword(passwordUpdateRequest.getEmail(), passwordUpdateRequest.getNewPassword());
        if (isUpdated) {
            return ResponseEntity.ok("{\"message\":\"Password updated successfully\"}");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\":\"User not found\"}");
        }
    }

    @GetMapping("/user-profile")
    public ResponseEntity<User> getUserProfile(@RequestParam String email) {
        return ResponseEntity.of(userSe.findByUseremail(email));
    }

    @PostMapping("/send-reset-link")
    public ResponseEntity<String> sendPasswordResetLink(@RequestParam String email, @RequestParam String appUrl) {
        try {
            userSe.sendPasswordResetLink(email, appUrl);
            return ResponseEntity.ok("Password reset link sent to " + email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while sending the reset link. Please try again later.");
        }
    }

    @PostMapping("/send-verification-code/{email}")
    public ResponseEntity<String> sendVerificationCode(@PathVariable String email) {
        userSe.sendVerificationCode(email);
        return ResponseEntity.ok("Verification code sent successfully to: " + email);
    }

    @PostMapping("/verify-code/{email}/{code}")
    public ResponseEntity<String> verifyCode(@PathVariable String email, @PathVariable String code) {
        boolean isVerified = userSe.verifyCode(email, code);
        if (isVerified) {
            return ResponseEntity.ok("Code verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Verification failed: Invalid or expired code");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        boolean isUpdated = userSe.uupdatePassword(token, newPassword);
        return isUpdated ? ResponseEntity.ok("Password updated successfully") : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or user not found");
    }
}
