package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.Reservation;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@ComponentScan
@Repository
public interface ReservRepository extends JpaRepository<Reservation,Long> {

    /*@Query("SELECT MONTH(r.date_reser), COUNT(r) FROM Reservation r WHERE YEAR(r.date_reser) = :year GROUP BY MONTH(r.date_reser)")
    List<Object[]> findMonthlyReservationCountsByYear(int year);*/

   /* @EntityGraph(value = "Evenement.detail", type = EntityGraph.EntityGraphType.LOAD)
    List<Event> findAllWithReservationsByYear(@Param("year") int year);*/
}

