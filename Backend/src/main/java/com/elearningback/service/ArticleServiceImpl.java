package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Article;
import com.esprit.elearningback.entity.Event;
import com.esprit.elearningback.repository.ArticleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ArticleServiceImpl implements ArticleService{

    @Autowired
    private ArticleRepository articleRepository;

    public Article saveArticle(Article article){
        article.setLikeCount(0);
        article.setViewCount(0);
        article.setName("iheb");
        article.setCreatedAt(new Date());
        return articleRepository.save(article);
    }



    public Page<Article> getAllArticles(int page){
        Pageable pageable = PageRequest.of(page, 2);
        return articleRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public List<Article> getAllArticles(){
        return articleRepository.findAllByOrderByIdAsc();
    }

    public Page<Article> getPopularArticles(){
        Pageable pageable = PageRequest.of(0, 3);
        return articleRepository.findAllByOrderByViewCountDesc(pageable);
    }

    public void removeArticle(Long articleId) {
        articleRepository.deleteById(articleId);
    }

    public Article modifyArticle(Article article) {
        return articleRepository.save(article);
    }

    public Article getArticleById(long articleId){
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        if (optionalArticle.isPresent()){
            Article article = optionalArticle.get();
            article.setViewCount(article.getViewCount() + 1);
            return articleRepository.save(article);
        }else {
            throw new EntityNotFoundException("Article not found");
        }
    }

    @Override
    public Map<String, Integer> statArticle() {
        Map<String, Integer> statResult = new HashMap<>();
        List<Article> articles = articleRepository.findAll();

        for (Article article : articles) {
            int viewCount = article.getViewCount();
            statResult.put(article.getTitle(), viewCount);
        }

        return statResult;
    }

    @Override
    public List<Article> getGetByTags(List<String> tags) {
        return articleRepository.findByTags(tags);
    }

}
