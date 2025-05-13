import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { Reservation } from 'src/app/model/Reservation';
import { ReservationService } from 'src/app/service/reservation.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  reservations: Reservation[] = [];
  searchTerm: string = '';
  statistics: any[] = [];
  year: number = new Date().getFullYear();

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  onDeleteBloc(reservation: Reservation) {
    if (confirm('Voulez-vous supprimer la reservation ?')) {
      if (reservation.id !== undefined) {
        this.reservationService
          .deleteReservation(reservation.id)
          .subscribe(() => {
            this.router.navigate(['/reservation']).then(() => {
              window.location.reload();
            });
          });
      }
    }
  }

  ngOnInit(): void {
    this.loadUniversites();
    this.fetchStatistics();
  }
  searchSynonyms() {
    this.reservationService.getAllReservation().subscribe((res) => {
      this.reservations = res.filter(
        (reservation: any) =>
          reservation.nom_reserv
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          reservation.id.toString().includes(this.searchTerm) ||
          reservation.date_reser.toString().includes(this.searchTerm)
      );
    });
  }

  loadUniversites() {
    this.reservationService.getAllReservation().subscribe(
      (data) => {
        this.reservations = data as Reservation[];
        console.log('Reservation:', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des reservation', error);
      }
    );
  }
  ExportPdf() {
    this.reservationService.exportUniversitesPdf().subscribe(
      (blob: Blob) => {
        const fileName = 'reservation.pdf';
        saveAs(blob, fileName);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  fetchStatistics(): void {
    this.reservationService.getMonthlyReservationCounts(this.year).subscribe({
      next: (data: any) => {
        // Assurez-vous que le type ici correspond à celui retourné par le service
        if (Array.isArray(data)) {
          // Vérifiez si les données sont bien un tableau
          this.statistics = data;
          this.createChart();
        } else {
          // Gérer les données incorrectes ici
        }
      },
      error: (error: any) => {
        // Gérer les erreurs ici
      },
    });
  }

  createChart(): void {
    const months = this.statistics.map((stat) => stat[0]);
    const counts = this.statistics.map((stat) => stat[1]);

    new Chart('myChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Nombre de réservations',
            data: counts,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  onClick(): void {
    this.fetchStatistics();
  }
  goTostatEnseignat() {
    this.router.navigate(['/statEtudiant']);
  }
}
