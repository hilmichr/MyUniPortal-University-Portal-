package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IUserService {
    public List<User> retrieveAllUsers();
    public User  retrieveUser(Long idUser);

    Optional<User> findByUseremail(String useremail);

    public User addUser(User u);
    public void removeUser(Long idUser);
    public User  modifyUser(User  user);
    public void modifpassword(String usermail);
    public void sendVerificationCode(String userEmail);
    public boolean updatePassword(String userEmail, String newPassword);
    public boolean verifyCode(String userEmail, String code);
    public Map<String, Integer> statUsersByRole();
    public void sendPasswordResetLink(String email, String appUrl);
    public boolean validatePasswordResetToken(String token);
    public boolean uupdatePassword(String token, String newPassword);
    public String getVerificationCode(String userEmail);
    public User modifyEtatUser(Long userId,boolean etat);


}
