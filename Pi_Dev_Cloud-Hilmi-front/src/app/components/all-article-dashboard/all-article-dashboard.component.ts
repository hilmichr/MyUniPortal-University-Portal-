import { Component } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-all-article-dashboard',
  templateUrl: './all-article-dashboard.component.html',
  styleUrls: ['./all-article-dashboard.component.css'],
})
export class AllArticleDashboardComponent {
  allArticles: any;
  constructor(private articleService: ArticleService) {}
  ngOnInit() {
    this.getAllArticles();
  }
  getAllArticles() {
    this.articleService.getAllArticles(2).subscribe(
      (res) => {
        console.log(res);
        this.allArticles = res.all;
      },
      (error) => {
        console.log('Error while fetching articles');
      }
    );
  }

  deleteArticle(id: number) {
    if (confirm('Voulez-vous supprimer Article ?')) {
      this.articleService.deleteArticle(id).subscribe(
        (res) => {
          console.log(res);
          this.ngOnInit();
        },
        (error) => {
          console.log('Error while fetching users');
        }
      );
    }
  }
}
