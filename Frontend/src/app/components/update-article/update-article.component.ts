import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from 'chart.js';
import { pull } from 'lodash';
import { find } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css'],
})
export class UpdateArticleComponent {
  articleForm!: FormGroup;
  articleId = this.activatedRoute.snapshot.params['id'];
  articleData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
    });
    this.getArticleById();
  }

  getArticleById() {
    this.articleService.getArticleById(this.articleId).subscribe(
      (res) => {
        this.articleForm.patchValue(res);
        this.articleData = res;
        console.log(this.articleData);
      },
      (error) => {
        console.log('Article not found');
      }
    );
  }

  updatePost() {
    const data = this.articleForm.value;
    data.id = this.articleData.id;
    console.log(data);

    this.articleService.updatePost(data).subscribe(
      (res) => {
        console.log('Your post was modifyed successfully', 'Ok');
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log('Error modifyed the post', 'Ok');
      }
    );
  }
}
