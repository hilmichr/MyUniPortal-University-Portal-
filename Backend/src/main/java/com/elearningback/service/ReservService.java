package com.esprit.elearningback.service;


import com.esprit.elearningback.entity.Reservation;
import com.esprit.elearningback.entity.Userr;
import com.esprit.elearningback.repository.IEventRepository;
import com.esprit.elearningback.repository.ReservRepository;
import com.esprit.elearningback.entity.Event;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReservService implements IReservService{

    ReservRepository reservRepository;
    IEventRepository eventRepository;

    public static final String ACCOUNT_SID ="AC5839a8f21a4bda29dee83f45bf53517c";
    public static final String AUTH_TOKEN ="89e21e616c46431f87bfffb68821c038";
    @Override
    public Reservation addReservation(Reservation reservation) {
        return reservRepository.save(reservation);
    }

    @Override
    public List<Reservation> getAllReservation() {
        return reservRepository.findAll();
    }

    @Override
    public Reservation getReservationById(long idReserv) {
        return reservRepository.findById(idReserv).get();
    }

    @Override
    public void deleteReservation(long idReserv) {
        reservRepository.deleteById(idReserv);

    }

    @Override
    public Reservation updateReservation(Reservation reservation) {
        return reservRepository.save(reservation);
    }

    @Override
    public Reservation AddReservationAndAssign(Reservation reservation,long IdEvent) {
        Event event = eventRepository.findById(IdEvent).get();
        reservation.setEvent(event);
        Userr user = new Userr(); // Assuming Userr has a default constructor
        user.setId(2L);
        reservation.setUserr(user);
        // Obtenez la date actuelle
        LocalDate dateActuelle = LocalDate.now();
// Affectez la date actuelle à la réservation
        reservation.setDate_reser(dateActuelle);

        return reservRepository.save(reservation);

    }

    @Override
    public String reserver(Long IdEvent, Reservation reservation) {
        Event event = eventRepository.findById(IdEvent).orElseThrow(() -> new RuntimeException("Événement non trouvé"));

        if (event.getNbrPlace() > 0) {
            event.setNbrPlace(event.getNbrPlace() - 1);

            eventRepository.save(event);
            /**************** lel ssmmsss ki tzid compte **********/

//            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
//       Message message = Message.creator(
//               new com.twilio.type.PhoneNumber("+21696212001"), // najem nbadlou dynamic userDtoCreation.getTel()
//                new com.twilio.type.PhoneNumber("+14152372741"),
//                        "Hi there the event "+event.getNom()+ " is completed ")
//            .create();
//
//        System.out.println(message.getSid());
            // Enregistrer la réservation
            return "Réservation réussie";
        } else {
            return "L'événement est complet";
        }
    }

    /*@Override
    public List<Object[]> getMonthlyReservationCountsByYear(int year) {
        return  reservRepository.findMonthlyReservationCountsByYear(year);
    }*/
    @Override

        public Map<String, Integer> statReservationParEvenement() {
            Map<String, Integer> statResult = new HashMap<>();
            List<Event> evenements = eventRepository.findAll();

            for (Event evenement : evenements) {
                // Assuming 'reservations' is properly populated in the Evenement entity
                int reservationCount = evenement.getReservations() != null ? evenement.getReservations().size() : 0;
                statResult.put(evenement.getNom(), reservationCount);
            }

            return statResult;
        }}


