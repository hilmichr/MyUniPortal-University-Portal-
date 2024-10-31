package com.esprit.elearningback.controller;

import com.cloudinary.Cloudinary;
import com.esprit.elearningback.entity.EvenementStatistics;
import com.esprit.elearningback.entity.Event;
import com.esprit.elearningback.repository.IEventRepository;
import com.esprit.elearningback.service.EventService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("api/evenement")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class EventController {
    EventService eventService;
    private IEventRepository evenementRepository;

    /* private static String UPLOADED_FOLDER = "./main/java/com/example/intershipmanagement/assets/";*/

    @Autowired
    private Cloudinary cloudinary;
    private static final String UPLOAD_DIR = "./main/java/com.example.intershipmanagement/assets";



    @GetMapping("/{eventId}/countAvisByStatus")
    public ResponseEntity<Map<String, Long>> countAvisByStatusForEvent(@PathVariable Long eventId) {
        Map<String, Long> statusCounts = eventService.countAvisByStatusForEvent(eventId);
        return ResponseEntity.ok(statusCounts);
    }


    @PostMapping("/add")
    public Event addEvent(@RequestBody Event event){
        return eventService.addEvent(event);
    }



    // Order 2
    @GetMapping("/getAll")
    public List<Event> getAllEvent(){
        System.out.println("im here");
        for(Event e:eventService.getAllEvent())
        {
            System.out.println("reservation"+ e.getReservations());
        }
        return eventService.getAllEvent();
    }

    // Order 3
    @GetMapping("/get/{idEvent}")
    public Event getEvent(@PathVariable long idEvent){
        return eventService.getEventById(idEvent);
    }

    // Order 4
    @DeleteMapping("/delete/{idEvent}")
    public void deleteEvent(@PathVariable("idEvent") long idTicket){
        eventService.deleteEvent(idTicket);
    }

    // Order 5
    @PutMapping("/update")
    public Event updateEvent(@RequestBody Event event){
        return eventService.updateEvent(event);
    }

    ///upload Image///
   /*@PostMapping("/upload")
   public String singleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {

       if (file.isEmpty()) {
           redirectAttributes.addFlashAttribute("message", "Veuillez sélectionner un fichier à télécharger");
           return "redirect:uploadStatus";
       }

       try {
           byte[] bytes = file.getBytes();
           Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
           Files.write(path, bytes);

           redirectAttributes.addFlashAttribute("message",
                   "Vous avez réussi à télécharger '" + file.getOriginalFilename() + "'");

       } catch (IOException e) {
           e.printStackTrace();
       }

       return "redirect:/uploadStatus";
   }

    @RequestMapping("/uploadStatus")
    public String uploadStatus() {
        return "uploadStatus";
    }*/


    @GetMapping("/statistics")
    public ResponseEntity<List<EvenementStatistics>> getDataObjectStatistics() {
        List<EvenementStatistics> statistics = eventService.getEvenementStatistics();

        return ResponseEntity.ok(statistics);
    }
   /* @CrossOrigin(origins = "*", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
    @PostMapping("/dashboard/clubs/uploadImage/{id}")
    public Event handleImageFileUpload(@RequestParam("fileImage") MultipartFile fileImage, @PathVariable long id) {
        return eventService.handleImageFileUpload(fileImage,id);
    }*/

    /*@PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        // Vous pouvez stocker le chemin du fichier dans la base de données si nécessaire
        // par exemple, enregistrez le `fileName` dans la base de données ici

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return ResponseEntity.ok(fileDownloadUri);
    }*/



    @GetMapping("/eventsByUser/{userId}")
    public ResponseEntity<List<Event>> getEventsByUserOrderByParticipation(@PathVariable("userId") Long userId) {
        List<Event> events = eventService.getEventsByUserOrderByParticipation(userId);

        return ResponseEntity.ok(events);
    }
}
