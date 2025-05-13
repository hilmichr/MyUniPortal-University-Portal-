package com.esprit.elearningback.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "spring.mail")
@Getter
@Setter
public class YourMailProperties {
    private String host;
    private int port;
    private String username;
    private String password;

}
