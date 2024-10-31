package com.esprit.elearningback.service;
import com.esprit.elearningback.entity.ResetToken;
import com.esprit.elearningback.entity.User;
import com.esprit.elearningback.entity.rle;
import com.esprit.elearningback.repository.ResetTokenRepository;
import com.esprit.elearningback.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;


@Service
@AllArgsConstructor
public class UserServiceImpl implements IUserService {
    UserRepository userRepository;
    EmailService emailService;
    private final PasswordEncoder passwordEncoder ;
    private ResetTokenRepository resetTokenRepository;

    private final Map<String, VerificationInfo> verificationData = new ConcurrentHashMap<>();



    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    public User retrieveUser(Long idUser) {
        return userRepository.findById(idUser).get();
    }

    @Override
    public Optional<User> findByUseremail(String useremail) {
        return userRepository.findByUseremail(useremail);
    }


    public User addUser(User User) {
        String hashPasword = passwordEncoder.encode(User.getPassword());
        User.setPassword(hashPasword);



        return userRepository.save(User);

    }


    public void removeUser(Long idUser) {
        userRepository.deleteById(idUser);

    }


    public User modifyUser(User User) {
        return userRepository.save(User);
    }

    private String generateRandomNumber(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));  // Generate a single digit (0-9)
        }
        return sb.toString();
    }

    public void modifpassword(String usermail) {
        String verificationCode = generateRandomNumber(6);

        String subject = "code verification";
        String body = "Your code verification: " + verificationCode;


        emailService.sendEmail(usermail, subject, body);

    }

    public void sendVerificationCode(String userEmail) {
        String code = generateRandomNumber(6);
        long expirationTime = System.currentTimeMillis() + (60 * 60 * 1000); // 60 minutes later
        verificationData.put(userEmail, new VerificationInfo(code, expirationTime));
        String subject = "Code Verification";
        String body = "Your code verification: " + code;
        emailService.sendEmail(userEmail, subject, body);
    }


    public boolean updatePassword(String userEmail, String newPassword) {
        Optional<User> userOptional = userRepository.findByUseremail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }
    public Map<String, Integer> statUsersByRole() {
        Map<String, Integer> statResult = new HashMap<>();
        int adminCount = (int) userRepository.countByRle(rle.ADMIN);
        int userCount = (int) userRepository.countByRle(rle.USER);
        statResult.put("ADMIN", adminCount);
        statResult.put("USER", userCount);
        return statResult;
    }

    public boolean verifyCode(String userEmail, String code) {
        VerificationInfo info = verificationData.get(userEmail);
        if (info != null && info.getCode().equals(code) && System.currentTimeMillis() <= info.getExpirationTime()) {
            verificationData.remove(userEmail); // Remove after successful verification
            return true;
        }
        return false;
    }
    public String getVerificationCode(String userEmail) {
        VerificationInfo info = verificationData.get(userEmail);
        return info != null ? info.getCode() : null;
    }

    static class VerificationInfo {
        private String code;
        private long expirationTime;

        public VerificationInfo(String code, long expirationTime) {
            this.code = code;
            this.expirationTime = expirationTime;
        }

        public String getCode() {
            return code;
        }

        public long getExpirationTime() {
            return expirationTime;
        }


    }
    /////////////////////////////////////////////////////////////
    public void sendPasswordResetLink(String email, String appUrl) {
        Optional<User> userOptional = userRepository.findByUseremail(email);
        if (userOptional.isPresent()) {
            String token = UUID.randomUUID().toString();
            ResetToken resetToken = new ResetToken();
            resetToken.setToken(token);
            resetToken.setUserEmail(email);
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.HOUR, 1); // Token valid for 1 hour
            resetToken.setExpirationDate(calendar.getTime());
            resetTokenRepository.save(resetToken);

            // Create the reset link
            String resetLink = appUrl + "/reset-password?token=" + token;

            // Send the email
            String subject = "Password Reset Request";
            String body = "To reset your password, click the link below:\n" + resetLink;
            emailService.sendEmail(email, subject, body);
        }
    }

    public boolean validatePasswordResetToken(String token) {
        Optional<ResetToken> resetTokenOptional = resetTokenRepository.findByToken(token);
        if (resetTokenOptional.isPresent()) {
            ResetToken resetToken = resetTokenOptional.get();
            if (resetToken.isExpired()) {
                resetTokenRepository.deleteByToken(token);
                return false;
            }
            return true;
        }
        return false;
    }
    @Transactional
    public boolean uupdatePassword(String token, String newPassword) {
        Optional<ResetToken> resetTokenOptional = resetTokenRepository.findByToken(token);
        if (resetTokenOptional.isPresent()) {
            ResetToken resetToken = resetTokenOptional.get();
            Optional<User> userOptional = userRepository.findByUseremail(resetToken.getUserEmail());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                resetTokenRepository.deleteByToken(token); // Invalidate the token
                return true;
            }
        }
        return false;
    }
    public User modifyEtatUser(Long userId,boolean etat) {
        User user = userRepository.findById(userId).get();
        user.setUseretat(etat);
        return userRepository.save(user);
    }
}