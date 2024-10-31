package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Image;
import com.esprit.elearningback.repository.IEventRepository;
import com.esprit.elearningback.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
    @Transactional
    public class ImagesService {
        @Autowired
          ImageRepository imageRepository;
        @Autowired
        IEventRepository eventRepository;
        public List<Image> list()
        {
            return imageRepository.findAll();
        }


        public Optional<Image> getOne(int id){return imageRepository.findById(id);}
        public void save(Image image){imageRepository.save(image);}

        public void delete(int id){imageRepository.deleteById(id);}
        public boolean exists(int id){return imageRepository.existsById(id);}
    }


