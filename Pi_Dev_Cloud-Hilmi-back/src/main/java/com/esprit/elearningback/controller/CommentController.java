package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Comment;
import com.esprit.elearningback.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestParam Long articleId, @RequestBody String content){
        try {
            return ResponseEntity.ok(commentService.saveComment(articleId,content));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @PostMapping("/createReplay")
    public ResponseEntity<?> createComment(@RequestParam Long articleId, @RequestBody String content, @RequestParam Long parentCommentId){
        try {
            return ResponseEntity.ok(commentService.saveCommentReplay(articleId,content,parentCommentId));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @GetMapping("getByArticleId/{articleId}")
    public ResponseEntity<?> getCommentsByArticleId(@PathVariable Long articleId){
        try {
            return ResponseEntity.ok(commentService.getCommentsByArticleId(articleId));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("getByParent/{parentCommentId}")
    public ResponseEntity<?> getCommentsByParentCommentId(@PathVariable Long parentCommentId){
        try {
            return ResponseEntity.ok(commentService.getCommentsByParentComment(parentCommentId));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
