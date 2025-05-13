import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from 'src/app/service/reservation.service';
import { Reservation } from 'src/app/model/Reservation';

@Component({
  selector: 'app-create-reserv',
  templateUrl: './create-reserv.component.html',
  styleUrls: ['./create-reserv.component.css'],
})
export class CreateReservComponent {
  reservForm!: FormGroup;
  event: any = [];
  eventId!: number;
  nomReservation: string = '';
  reservation: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient, // Ajout de HttpClient
    private route: ActivatedRoute // Injectez ActivatedRoute ici
  ) {}
  ngOnInit(): void {
    this.reservForm = this.formBuilder.group({
      nom_reserv: ['', [Validators.required]], // Correction ici: Ajout du crochet fermant
      //date_reser: ['', [Validators.required]]
    });
    this.route.params.subscribe((params) => {
      this.eventId = +params['id']; // Le '+' convertit la valeur en nombre
    });
  }

  saveEvent(idEvent: number) {
    // Assurez-vous de passer l'idEvent en tant que paramètre à cette méthode
    if (this.reservForm.valid) {
      this.reservationService
        .addReservationAndAssignEvent(this.reservForm.value, this.eventId)
        .subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(['/evenement']);
          },
          (error) => console.error('Error:', error)
        );
    } else {
      console.error("Le formulaire n'est pas valide.");
    }
  }

  onSubmit() {
    if (this.reservForm.valid) {
      console.log(this.reservForm.value);
      this.saveEvent(this.event); // Utilisez la propriété eventId lors de l'appel de saveEvent
    } else {
      console.log(
        "Le formulaire n'est pas valide. Veuillez remplir tous les champs correctement."
      );
    }
  }
  reserve() {
    this.reservationService
      .reserve(this.eventId, { nomReservation: this.nomReservation })
      .subscribe({
        next: (response) => alert(response.message),
        error: (error) => alert('reservation affecte avec succees'),
      });
  }
}
