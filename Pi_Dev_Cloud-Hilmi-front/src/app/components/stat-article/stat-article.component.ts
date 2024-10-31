import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-stat-article',
  templateUrl: './stat-article.component.html',
  styleUrls: ['./stat-article.component.css'],
})
export class StatArticleComponent {
  @ViewChild('articleChart') articleChart!: ElementRef<HTMLCanvasElement>;
  errorMessage: string | undefined;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = this.articleChart.nativeElement.getContext('2d');

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

      this.articleService.statArticle().subscribe(
        (data) => {
          const labels = Object.keys(data);
          const chartData = Object.values(data);

          new Chart(ctx, {
            type: 'bar' as ChartType,
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'View of Article',
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
