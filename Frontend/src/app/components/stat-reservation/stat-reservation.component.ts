import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';

import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-stat-reservation',
  templateUrl: './stat-reservation.component.html',
  styleUrls: ['./stat-reservation.component.css'],
})
export class StatReservationComponent implements OnInit {
  @ViewChild('verticalChart') verticalChart!: ElementRef<HTMLCanvasElement>;

  MapList: any;
  errorMessage: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private reservationService: ReservationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createChart();
    } else {
      console.log('Skipping chart creation on the server');
    }
  }

  createChart() {
    //declaration chart
    const ctx = this.verticalChart.nativeElement.getContext('2d');

    if (ctx) {
      this.reservationService.statEnseignatParSpecialite().subscribe(
        (data) => {
          this.MapList = data;

          const labels = Object.keys(data); // specialite
          const chartData = Object.values(data); // pourcentage

          //labels.push("Total");
          chartData.push(25);

          // Now that we have the data, we can initialize the chart here
          const chart = new Chart(ctx, {
            type: 'bar', // You can change this to 'line', 'pie', etc.
            data: {
              labels: labels, // Use the labels from the data
              datasets: [
                {
                  label: 'Statistique Reservation par nombre de place',
                  data: chartData, // Use the extracted data
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(199, 199, 199, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(199, 199, 199, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',

                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                  ],
                  borderWidth: 1,
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
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = "Une erreur s' " + error.message;
        }
      );
    } else {
      console.error('Failed to get canvas context');
    }
  }
}
