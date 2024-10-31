package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Article;
import com.esprit.elearningback.entity.Comment;
import com.esprit.elearningback.repository.ArticleRepository;
import com.esprit.elearningback.repository.CommentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ArticleRepository articleRepository;

    public Comment saveComment(Long articleId , String content){
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        if (optionalArticle.isPresent()){
            Comment comment = new Comment();
            comment.setArticle(optionalArticle.get());
            comment.setName("Iheb");
            comment.setCreatedAt(new Date());
            comment.setContent(content);
            return commentRepository.save(comment);
        }
        throw new EntityNotFoundException("Article not found");
    }

    @Override
    public Comment saveCommentReplay(Long articleId, String content, Long parentCommentId) {
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        if (optionalArticle.isPresent()){
            Comment comment = new Comment();
            comment.setArticle(optionalArticle.get());
            comment.setName("Iheb");
            comment.setCreatedAt(new Date());
            comment.setContent(content);
            comment.setParentCommentId(parentCommentId);
            return commentRepository.save(comment);
        }
        throw new EntityNotFoundException("Article not found");
    }

    public List<Comment> getCommentsByArticleId(Long articleId){
        return commentRepository.findByArticleId(articleId);

    }

    public List<Comment> getCommentsByParentComment(Long parentCommentId){
        return commentRepository.findByParent(parentCommentId);

    }
}
