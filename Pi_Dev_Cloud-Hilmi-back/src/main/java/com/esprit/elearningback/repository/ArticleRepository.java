package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article,Long> {
    Page<Article> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Article> findAllByOrderByViewCountDesc(Pageable pageable);
    List<Article> findAllByOrderByIdAsc();
    List<Article> findByTags(List<String> tags);

}
