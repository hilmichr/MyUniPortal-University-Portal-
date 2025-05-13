package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public interface ArticleService {
    public Article saveArticle(Article article);
    public void removeArticle(Long articleId);
    public Page<Article> getAllArticles(int page);
    public List<Article> getAllArticles();
    public Article getArticleById(long articleId);
    public Page<Article> getPopularArticles();
    public Article modifyArticle(Article article);
    public Map<String, Integer> statArticle();
    public List<Article> getGetByTags(List<String> tags);
}
