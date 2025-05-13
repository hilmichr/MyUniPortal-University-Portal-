package com.esprit.elearningback.controller;


import com.esprit.elearningback.entity.Image;
import com.esprit.elearningback.service.CloudinaryService;
import com.esprit.elearningback.service.IEventService;
import com.esprit.elearningback.service.ImageService;
import com.esprit.elearningback.service.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/Event/cloudinary")
@CrossOrigin(origins = "*")
public class CloudinaryController {
    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    ImagesService imageService;

    @Autowired
    IEventService eventService;
    @GetMapping("/list")
    public ResponseEntity<List<Image>> list(){
        List<Image> list = imageService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    //@GetMapping("/list/{event}")
    // public ResponseEntity<List<Image>> list(@PathVariable("event") int eventid){
    //    List<Image> list = imageService.list(eventid);
    //     return new ResponseEntity<>(list, HttpStatus.OK);
    //  }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<Image> upload(@RequestParam MultipartFile multipartFile) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Map result = cloudinaryService.upload(multipartFile);
        Image image = new Image((String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));
        imageService.save(image);
        return new ResponseEntity<>(image, HttpStatus.OK);
    }
    @PostMapping("/upload/{eventId}")
    @ResponseBody
    public ResponseEntity<Image> uploadForEvent(@RequestParam MultipartFile multipartFile,@PathVariable("eventId") int eventId) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Map result = cloudinaryService.upload(multipartFile);
        Image image = new Image((String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));
        image.setEventID(eventId);
        imageService.save(image);
        return new ResponseEntity<>(image, HttpStatus.OK);
    }


   /* @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        eventService.removeImageIdFromEvent(id);
        Optional<Image> imageOptional = imageService.getOne(id);
        if (imageOptional.isEmpty()) {
            return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
        }
        Image image = imageOptional.get();
        String cloudinaryImageId = image.getImageId();
        try {
            cloudinaryService.delete(cloudinaryImageId);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to delete image from Cloudinary", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        imageService.delete(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }*/

}