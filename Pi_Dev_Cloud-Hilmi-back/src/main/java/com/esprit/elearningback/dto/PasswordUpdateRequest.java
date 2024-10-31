package com.esprit.elearningback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class PasswordUpdateRequest {
    private String email;
    private String newPassword;
}
