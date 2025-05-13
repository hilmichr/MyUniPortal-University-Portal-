package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Subject;
import com.esprit.elearningback.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "api/v1/subject")
@CrossOrigin(origins = "*")
public class SubjectController {

    private final SubjectService subjectService;
    @Autowired
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;

    }


    @GetMapping("/list-subjects")
    public List<Subject> getSubjects(){
        return subjectService.getSubjects();
    }

    @PostMapping("/add-subject")
    public void addSubject(@RequestBody Subject subject)
    {
        subjectService.addNewSubject(subject);
    }

    @PutMapping("/update/{id}")
    public void updateSubject(@PathVariable("id") Long id, @RequestBody Subject subject) {
        subject.setSubjectId(id); // Ensure the ID is set for the update operation
        subjectService.updateSubject(subject);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubjectById(id);
    }

    @GetMapping("/findsubjectbyid/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Long id) {
        Subject subject = subjectService.getSubjectById(id);
        if (subject != null) {
            return ResponseEntity.ok().body(subject);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/trending")
    public List<Subject> getTrendingSubject(){
        return subjectService.getTrendingSubjects();
    }


}