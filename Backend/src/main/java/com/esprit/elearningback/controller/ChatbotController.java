package com.esprit.elearningback.controller;

import com.esprit.elearningback.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/chat")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @GetMapping("/response")
    public ResponseEntity<String> getChatbotResponse(@RequestParam("question") String question) {
        String response = chatbotService.getResponse(question);
        return ResponseEntity.ok(response);
    }
}

