package com.esprit.elearningback.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private Date createdAt;

    private String name;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    private Long parentCommentId;

    @OneToMany(mappedBy = "parentCommentId", fetch = FetchType.LAZY)
    private Set<Comment> childComments = new HashSet<Comment>();

}
