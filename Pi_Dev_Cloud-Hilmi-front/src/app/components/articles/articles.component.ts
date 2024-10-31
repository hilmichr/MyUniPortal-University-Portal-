import { Component } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent {
  allArticles: any;
  currentPage: number = 1;
  totalPageNumber = 0;
  popularArticles: any;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.getAllArticles(this.currentPage);
    console.log(this.currentPage);
    this.getPopularArticles();
  }

  getAllArticles(page: number) {
    this.articleService.getAllArticles(page).subscribe(
      (res) => {
        console.log(res);
        this.totalPageNumber = Number(res.nbPage);
        console.log(this.totalPageNumber);
        this.allArticles = res.data;
      },
      (error) => {
        console.log('Error while fetching articles');
      }
    );
  }
  getPopularArticles() {
    this.articleService.getPopularArticles().subscribe(
      (res) => {
        this.popularArticles = res.data;
        console.log(res.data);
      },
      (error) => {
        console.log('Article not found');
      }
    );
  }
}
