package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Comment;

import java.util.List;

public interface CommentService {
    public Comment saveComment(Long articleId , String content);
    public Comment saveCommentReplay(Long articleId , String content,Long parentCommentId);
    public List<Comment> getCommentsByArticleId(Long articleId);
    public List<Comment> getCommentsByParentComment(Long parentCommentId);
}
