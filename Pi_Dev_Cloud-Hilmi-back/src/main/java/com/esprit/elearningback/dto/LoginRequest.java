package com.esprit.elearningback.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Data
@AllArgsConstructor
public class LoginRequest {
    private String email;
    private String password;

}
