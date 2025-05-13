import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Chart,
  ChartType,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-stat-role-component',
  templateUrl: './stat-role-component.component.html',
  styleUrls: ['./stat-role-component.component.css'],
})
export class StatRoleComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('roleChart') roleChart!: ElementRef<HTMLCanvasElement>;
  errorMessage: string | undefined;

  constructor(private jwtService: JwtService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = this.roleChart.nativeElement.getContext('2d');

    if (ctx) {
      // Register required Chart.js components
      Chart.register(
        BarElement,
        BarController,
        CategoryScale,
        LinearScale,
        Title,
        Tooltip,
        Legend
      );

      this.jwtService.statUsersByRole().subscribe(
        (data) => {
          const labels = Object.keys(data); // Role names (e.g., "ADMIN", "USER")
          const chartData = Object.values(data); // Counts of users for each role

          // Create the bar chart
          new Chart(ctx, {
            type: 'bar' as ChartType,
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Number of Users by Role',
                  data: chartData,
                  backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                  ],
                  borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
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
        (error) => {
          this.errorMessage = 'Error fetching data: ' + error.message;
        }
      );
    } else {
      console.error('Failed to get canvas context');
    }
  }
}
