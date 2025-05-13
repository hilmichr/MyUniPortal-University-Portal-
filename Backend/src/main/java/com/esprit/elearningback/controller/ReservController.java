package com.esprit.elearningback.controller;
import com.esprit.elearningback.entity.Event;
import com.esprit.elearningback.entity.QRCodeGenerator;
import com.esprit.elearningback.entity.Reservation;
import com.esprit.elearningback.service.EventService;
import com.esprit.elearningback.service.ReservService;
import com.google.zxing.WriterException;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;


import com.itextpdf.text.pdf.PdfPTable;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("api/reservation")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReservController {
    ReservService reservService;
    EventService eventService;
    private QRCodeGenerator qrCodeGenerator;

    @PostMapping("/add")
    public Reservation addReservation(@RequestBody Reservation reservation) {
        return reservService.addReservation(reservation);
    }

    @GetMapping("/getAlll")
    public List<Reservation> getAllReservation() {
        return reservService.getAllReservation();
    }

    @GetMapping("/get/{idReserv}")
    public Reservation getReservationById(@PathVariable long idReserv) {
        return reservService.getReservationById(idReserv);
    }

    // Order 4
    @DeleteMapping("/delete/{idReserv}")
    public void deleteReservation(@PathVariable("idReserv") long idReserv) {
        reservService.deleteReservation(idReserv);
    }

    // Order 5
    @PutMapping("/update")
    public Reservation updateReservation(@RequestBody Reservation reservation) {
        return reservService.updateReservation(reservation);
    }

    @PostMapping("/assign/{idEvent}")
    public Reservation addReservationAndAssignEvent(@RequestBody Reservation reservation, @PathVariable("idEvent") long idEvent) {
        return reservService.AddReservationAndAssign(reservation, idEvent);
    }

    @PostMapping("/reserve/{idEvent}")
    public String reserver(@PathVariable Long idEvent, @RequestBody Reservation reservation) {

        return reservService.reserver(idEvent, reservation);
    }

   /* @GetMapping("/statistics")
    public List<Object[]> getMonthlyReservationCountsByYear(
            @RequestParam("year") int year) {
        return reservService.getMonthlyReservationCountsByYear(year);
    }*/

//    @GetMapping("/pdf")
//    public void exportUniversitesPdf(HttpServletResponse response) throws IOException, DocumentException {
//        // Set the content type and attachment header
//        response.setContentType("application/pdf");
//        response.setHeader("Content-Disposition", "attachment; filename=\"reservation.pdf\"");
//
//        Document document = new Document();
//        PdfWriter.getInstance(document, response.getOutputStream());
//        document.open();
//
//        // Inclure un logo
//        Image logo = Image.getInstance("src/main/java/com/example/intershipmanagement/assets/logo.png");
//        logo.scalePercent(10);
//        logo.setAlignment(Element.ALIGN_CENTER);
//        document.add(logo);
//
//
//        // Définir des polices et des couleurs
//        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, new BaseColor(255, 0, 0));
//        Font headingFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
//        Font textFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);
//
//        Paragraph title = new Paragraph("Liste des Réservations", titleFont);
//        title.setAlignment(Element.ALIGN_CENTER);
//        title.setSpacingAfter(20);
//        document.add(title);
//
//        PdfPTable table = new PdfPTable(3);
//        table.setWidthPercentage(100);
//        float[] columnWidths = {1.5f, 2f, 1f};
//        table.setWidths(columnWidths);
//
//        PdfPCell cell1 = new PdfPCell(new Paragraph("Nom de l'événement", headingFont));
//        PdfPCell cell2 = new PdfPCell(new Paragraph("Nom de la réservation", headingFont));
//        PdfPCell cell3 = new PdfPCell(new Paragraph("Date de réservation", headingFont));
//
//        cell1.setBackgroundColor(new BaseColor(255, 0, 0));
//        cell2.setBackgroundColor(new BaseColor(255, 0, 0));
//        cell3.setBackgroundColor(new BaseColor(255, 0, 0));
//
//        cell1.setPadding(10);
//        cell2.setPadding(10);
//        cell3.setPadding(10);
//
//        table.addCell(cell1);
//        table.addCell(cell2);
//        table.addCell(cell3);
//
//        // Récupérer la liste des réservations
//        List<Reservation> reservations = reservService.getAllReservation();
//
//        // Vérifier que la liste des réservations n'est pas nulle
//        if (reservations != null) {
//            // Group reservations by event name
//            Map<String, List<Reservation>> groupedReservations = new HashMap<>();
//            for (Reservation reservation : reservations) {
//                String eventName = reservation.getEvent() != null ? reservation.getEvent().getNom() : "Non spécifié";
//                groupedReservations.computeIfAbsent(eventName, k -> new ArrayList<>()).add(reservation);
//            }
//
//            // Iterate over each event name and create a section in the PDF
//            for (Map.Entry<String, List<Reservation>> entry : groupedReservations.entrySet()) {
//                String eventName = entry.getKey();
//                List<Reservation> reservationList = entry.getValue();
//
//                // Add event name as a title
//                PdfPCell eventTitleCell = new PdfPCell(new Paragraph(eventName, titleFont));
//                eventTitleCell.setColspan(3);
//                eventTitleCell.setPadding(10);
//                table.addCell(eventTitleCell);
//
//                // Add reservations under this event
//                for (Reservation reservation : reservationList) {
//                    PdfPCell reservationCell1 = new PdfPCell(new Paragraph(eventName, textFont));
//                    PdfPCell reservationCell2 = new PdfPCell(new Paragraph(reservation.getNom_reserv(), textFont));
//                    PdfPCell reservationCell3 = new PdfPCell(new Paragraph(reservation.getDate_reser().toString(), textFont));
//
//                    reservationCell1.setPadding(10);
//                    reservationCell2.setPadding(10);
//                    reservationCell3.setPadding(10);
//
//                    table.addCell(reservationCell1);
//                    table.addCell(reservationCell2);
//                    table.addCell(reservationCell3);
//                }
//            }
//        }
//
//        document.add(table);
//        document.close();
//    }


    @GetMapping("/pdf")
    public void exportUniversitesPdf(HttpServletResponse response) throws IOException, DocumentException {
        // Set the content type and attachment header
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=\"reservation.pdf\"");

        Document document = new Document();
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        // Inclure un logo
        Image logo = Image.getInstance("src/main/java/com/esprit/elearningback/assets/logo.png");
        logo.scalePercent(10);
        logo.setAlignment(Element.ALIGN_CENTER);
        document.add(logo);

        // Définir des polices et des couleurs
        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, new BaseColor(255, 0, 0));
        Font headingFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
        Font textFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);

        Paragraph title = new Paragraph("Liste des Réservations", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);

        PdfPTable table = new PdfPTable(4); // 4 colonnes (Nom de l'événement, Nom de la réservation, Date de réservation, QR Code)
        table.setWidthPercentage(100);
        float[] columnWidths = {1.5f, 2f, 1f, 1f}; // Largeurs des colonnes
        table.setWidths(columnWidths);

        PdfPCell cell1 = new PdfPCell(new Paragraph("Nom de l'événement", headingFont));
        PdfPCell cell2 = new PdfPCell(new Paragraph("Nom de la réservation", headingFont));
        PdfPCell cell3 = new PdfPCell(new Paragraph("Date de réservation", headingFont));
        PdfPCell cell4 = new PdfPCell(new Paragraph("QR Code", headingFont));

        cell1.setBackgroundColor(new BaseColor(255, 0, 0));
        cell2.setBackgroundColor(new BaseColor(255, 0, 0));
        cell3.setBackgroundColor(new BaseColor(255, 0, 0));
        cell4.setBackgroundColor(new BaseColor(255, 0, 0));

        cell1.setPadding(10);
        cell2.setPadding(10);
        cell3.setPadding(10);
        cell4.setPadding(10);

        table.addCell(cell1);
        table.addCell(cell2);
        table.addCell(cell3);
        table.addCell(cell4);

        // Récupérer la liste des réservations
        List<Reservation> reservations = reservService.getAllReservation();

        // Vérifier que la liste des réservations n'est pas nulle
        if (reservations != null) {
            // Group reservations by event name
            Map<String, List<Reservation>> groupedReservations = new HashMap<>();
            for (Reservation reservation : reservations) {
                String eventName = reservation.getEvent() != null ? reservation.getEvent().getNom() : "Non spécifié";
                groupedReservations.computeIfAbsent(eventName, k -> new ArrayList<>()).add(reservation);
            }

            // Iterate over each event name and create a section in the PDF
            for (Map.Entry<String, List<Reservation>> entry : groupedReservations.entrySet()) {
                String eventName = entry.getKey();
                List<Reservation> reservationList = entry.getValue();

                // Add event name as a title
                PdfPCell eventTitleCell = new PdfPCell(new Paragraph(eventName, titleFont));
                eventTitleCell.setColspan(4);
                eventTitleCell.setPadding(10);
                table.addCell(eventTitleCell);

                // Add reservations under this event
                for (Reservation reservation : reservationList) {
                    PdfPCell reservationCell1 = new PdfPCell(new Paragraph(eventName, textFont));
                    PdfPCell reservationCell2 = new PdfPCell(new Paragraph(reservation.getNom_reserv(), textFont));
                    PdfPCell reservationCell3 = new PdfPCell(new Paragraph(reservation.getDate_reser().toString(), textFont));

                    reservationCell1.setPadding(10);
                    reservationCell2.setPadding(10);
                    reservationCell3.setPadding(10);

                    // Call generateQRCodeImageBytes method and insert the QR code image into the cell
                    PdfPCell qrCodeCell = new PdfPCell();
                    qrCodeCell.setPadding(10);
                    try {
                        byte[] qrCodeImageBytes = generateQRCodeImageBytes(reservation.getEvent().getId());
                        if (qrCodeImageBytes != null) {
                            Image qrCodeImage = Image.getInstance(qrCodeImageBytes);
                            qrCodeImage.scalePercent(50); // Scale the QR code image
                            qrCodeCell.addElement(qrCodeImage);
                        }
                    } catch (IOException | WriterException e) {
                        e.printStackTrace();
                    }

                    // Add cells to the table
                    table.addCell(reservationCell1);
                    table.addCell(reservationCell2);
                    table.addCell(reservationCell3);
                    table.addCell(qrCodeCell);
                }
            }
        }

        document.add(table);
        document.close();
    }

    // Méthode pour générer les bytes de l'image du QR code
    private byte[] generateQRCodeImageBytes(long eventId) throws WriterException, IOException {
        Event event = eventService.getEventById(eventId);
        String fileAttributes = getFileAttributesString(event);
        return qrCodeGenerator.generateQRCodeImage(fileAttributes);
    }

    // Méthode getFileAttributesString non modifiée
    private String getFileAttributesString(Event event) {
        StringBuilder sb = new StringBuilder();
        sb.append("Event ID: ").append(event.getId()).append("\n");
        sb.append("Event Nom: ").append(event.getNom()).append("\n");
        sb.append("Event Lieu: ").append(event.getLieu()).append("\n");
        sb.append("Event Type: ").append(event.getType()).append("\n");
        sb.append("Date début: ").append(event.getDate_deb()).append("\n");
        sb.append("Date fin: ").append(event.getDate_fin()).append("\n");
        int reservationsCount = event.getReservations().size(); // Utiliser la méthode size() pour obtenir le nombre de réservations
        sb.append("Reservations Count: ").append(reservationsCount).append("\n");

        return sb.toString();
    }

    @GetMapping("/statReservationParEvent")
    public Map<String, Integer> statReservationParEvenement(){
        return reservService.statReservationParEvenement();
    }

   /* @GetMapping("/reservations")
    public ResponseEntity<Map<String, Integer>> getReservationStats() {
        return ResponseEntity.ok(reservService.getReservationStatsForCurrentYear());
    }*/
}
