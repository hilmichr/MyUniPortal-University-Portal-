package com.esprit.elearningback.service;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service


public class JwtBlacklistService {
    private final Set<String> blacklistedTokens = new HashSet<>();

    public void add(String token) {
        blacklistedTokens.add(token);
    }

    public boolean contains(String token) {
        return blacklistedTokens.contains(token);
    }
}