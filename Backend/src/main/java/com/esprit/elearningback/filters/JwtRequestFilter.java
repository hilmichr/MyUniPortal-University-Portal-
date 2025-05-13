package com.esprit.elearningback.filters;

import com.esprit.elearningback.service.JwtBlacklistService;
import com.esprit.elearningback.service.jwt.CustomerServiceImpl;
import com.esprit.elearningback.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtRequestFilter.class);  // Create a logger instance

    private final CustomerServiceImpl customerService;
    private final JwtUtil jwtUtil;
    private final JwtBlacklistService jwtBlacklistService;


    @Autowired
    public JwtRequestFilter(CustomerServiceImpl customerService, JwtUtil jwtUtil, JwtBlacklistService jwtBlacklistService) {
        this.customerService = customerService;
        this.jwtUtil = jwtUtil;
        this.jwtBlacklistService = jwtBlacklistService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        LOGGER.info("Authorization Header: {}", authHeader);  // Log Authorization header

        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);  // Extract JWT token
            try {
                username = jwtUtil.extractUsername(token);  // Extract username from JWT

                // Check if the token is blacklisted
                if (jwtBlacklistService.contains(token)) {
                    LOGGER.warn("Blacklisted token detected: {}", token);
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
            } catch (Exception e) {
                LOGGER.warn("Invalid token: {}", token, e);
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customerService.loadUserByUsername(username);
            if (jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                LOGGER.info("User {} authenticated successfully.", username);  // Log successful authentication
            } else {
                LOGGER.warn("Invalid token for user {}", username);  // Log warning for invalid token
            }
        }

        filterChain.doFilter(request, response);
    }
}
