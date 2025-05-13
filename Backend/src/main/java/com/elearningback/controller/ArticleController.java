package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Article;
import com.esprit.elearningback.service.ArticleService;
import com.esprit.elearningback.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/article")
@CrossOrigin(origins = "*")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    @Autowired
    private ImageService imageService;

    @PostMapping
    public ResponseEntity<?> createArticle(
            @RequestParam("article") String articleJson,
            @RequestParam("blogImage") MultipartFile blogImage
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Article article = mapper.readValue(articleJson, Article.class);

            article.setImageUrl(imageService.uploadBlogImage(blogImage));
            Article createdArticle = articleService.saveArticle(article);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/modify-article")
    public ResponseEntity<?> modifyArticle(@RequestBody Article article) {
        try {
            Article art= articleService.getArticleById(article.getId());
            art.setTitle(article.getTitle());
            art.setContent(article.getContent());
            Article modifyedArticle = articleService.modifyArticle(art);
            return ResponseEntity.status(HttpStatus.OK).body(modifyedArticle);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public Map<String,Object> getAllArticles(@RequestParam(name = "page",defaultValue = "0") int page){
        Map<String,Object> resopnse = new HashMap<String,Object>();
        try {
            resopnse.put("nbPage",String.valueOf(articleService.getAllArticles(page-1).getTotalPages()));
            resopnse.put("status",HttpStatus.OK);
            resopnse.put("data",articleService.getAllArticles(page-1).getContent());
            resopnse.put("all",articleService.getAllArticles());
            return resopnse;
        } catch (Exception e){
            resopnse.put("status",HttpStatus.INTERNAL_SERVER_ERROR);
            return resopnse;
        }
    }

    @GetMapping("/get-popular-article")
    public Map<String,Object> getPopularArticles(){
        Map<String,Object> resopnse = new HashMap<String,Object>();
        try {
            resopnse.put("status",HttpStatus.OK);
            resopnse.put("data",articleService.getPopularArticles().getContent());
            return resopnse;
        } catch (Exception e){
            resopnse.put("status",HttpStatus.INTERNAL_SERVER_ERROR);
            return resopnse;
        }
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<?> getArticleById(@PathVariable Long articleId){
        try {
            Article article = articleService.getArticleById(articleId);
            return ResponseEntity.ok(article);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/remove/{articleId}")
    public ResponseEntity<?> removeArticle(@PathVariable("articleId") Long articleId) {

        try {
            articleService.removeArticle(articleId);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/stat")
    public Map<String, Integer> statArticle(){
        return articleService.statArticle();
    }

    @GetMapping("/get-by-tags")
    public ResponseEntity<?>  statArticle(@RequestBody List<String> tags){
        return ResponseEntity.status(HttpStatus.OK).body(articleService.getGetByTags(tags));
    }
}
