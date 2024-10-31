package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArticleId(Long articleId);
    @Query("SELECT c FROM Comment c WHERE c.parentCommentId = :parentCommentId")
    public List<Comment> findByParent(@Param("parentCommentId") Long parentCommentId);
}
