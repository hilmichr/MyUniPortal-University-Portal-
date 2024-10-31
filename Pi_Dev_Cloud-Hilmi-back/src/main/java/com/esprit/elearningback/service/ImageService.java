package com.esprit.elearningback.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageService {

    private Cloudinary cloudinary;

    public ImageService() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dry0du9sd",
                "api_key", "939196441535749",
                "api_secret", "d99s4TATV50_7CcDzkxE2mqB4IM"));
    }

    public String uploadBlogImage(MultipartFile blogImageFile) throws IOException {
        // Téléchargez l'image vers Cloudinary et obtenez l'URL de l'image téléchargée
        Map uploadResult = cloudinary.uploader().upload(blogImageFile.getBytes(), ObjectUtils.emptyMap());
        return (String) uploadResult.get("url");
    }
}