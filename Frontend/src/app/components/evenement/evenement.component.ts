import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EvenementService } from 'src/app/service/evenement.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { Reservation } from 'src/app/model/Reservation';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css'],
})
export class EvenementComponent implements OnInit {
  value: number = 0;
  events: any;
  event: any = [];
  eventsByUser: Event[] = [];
  eventId!: number;
  nomReservation: string = '';
  reservation: Reservation[] = [];

  userId: number = 2; // Remplacez par l'ID de l'utilisateur réel

  constructor(
    private evenementService: EvenementService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient, // Ajout de HttpClient
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getAllEvents();
    this.route.params.subscribe((params) => {
      this.eventId = +params['id']; // Le '+' convertit la valeur en nombre
    });
  }

  getAllEvents() {
    this.evenementService.getAllEvent().subscribe(
      (data) => {
        this.events = data;
        console.log('Event:', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements', error);
      }
    );
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getEventsByUserType(): void {
    this.evenementService
      .getEventsByUserOrderByParticipation(this.userId)
      .subscribe(
        (data) => {
          this.events = data as Event[];
          console.log('Event:', data);
        },
        (error) => {
          console.error('Erreur lors de la récupération des événements', error);
        }
      );
  }
}
