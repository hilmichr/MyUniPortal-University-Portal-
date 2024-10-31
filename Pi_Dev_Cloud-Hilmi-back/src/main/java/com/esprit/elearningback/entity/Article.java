package com.esprit.elearningback.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private String category;

    @Column(length = 5000)
    private String content;

    @Column(length = 5000)
    private String imageUrl;

    private String name;

    private Date createdAt;

    private int likeCount;

    private int viewCount;

    @ElementCollection
    private List<String> tags;

    @PreRemove
    private void preRemove() {
        // Manually remove tags
        this.tags.clear();
    }
}
