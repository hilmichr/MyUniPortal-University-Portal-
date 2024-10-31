import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/service/article.service';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent {
  loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.document.createElement('script');
      script.src = src;
      script.async = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = (error: Event | string) => {
        reject(error);
      };

      this.document.body.appendChild(script);
    });
  }

  articleId = this.activatedRoute.snapshot.params['id'];
  articleData: any;
  popularArticles: any;
  comments: any;
  isReplayed: any;
  commentId: any;
  replayForm!: FormGroup;

  commentForm!: FormGroup;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.loadScript('/assets/assets-front/js/vendor/modernizr-3.6.0.min.js')
      .then(() =>
        this.loadScript('/assets/assets-front/js/vendor/jquery-1.12.4.min.js')
      )
      .then(() => this.loadScript('/assets/assets-front/js/bootstrap.min.js'))
      .then(() => this.loadScript('/assets/assets-front/js/slick.min.js'))
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.magnific-popup.min.js')
      )
      .then(() => this.loadScript('/assets/assets-front/js/waypoints.min.js'))
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.counterup.min.js')
      )
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.nice-select.min.js')
      )
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.nice-number.min.js')
      )
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.countdown.min.js')
      )
      .then(() => this.loadScript('/assets/assets-front/js/validator.min.js'))
      .then(() => this.loadScript('/assets/assets-front/js/ajax-contact.js'))
      .then(() => this.loadScript('/assets/assets-front/js/main.js'))
      .then(() =>
        this.loadScript(
          'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY'
        )
      )
      .then(() => this.loadScript('/assets/assets-front/js/map-script.js'))
      .catch((error) => console.error('Error loading scripts:', error));
    console.log(this.articleId);
    this.getArticleById();
    this.getCommentsByArticleId();

    this.commentForm = this.fb.group({
      content: [null, Validators.required],
    });
    this.replayForm = this.fb.group({
      content: [null, Validators.required],
    });
    this.getPopularArticles();
  }

  publishComment() {
    const content = this.commentForm.get('content')?.value;
    console.log(this.commentForm.get('content')?.value);
    console.log(this.articleId);

    this.commentService.createNewComment(this.articleId, content).subscribe(
      (res) => {
        console.log('Comment Published Successfully', 'ok');
        this.ngOnInit();
      },
      (error) => {
        console.log('Something Went Wrong!!!');
      }
    );
  }

  getArticleById() {
    this.articleService.getArticleById(this.articleId).subscribe(
      (res) => {
        this.articleData = res;
        console.log(res);
      },
      (error) => {
        console.log('Article not found');
      }
    );
  }

  getCommentsByArticleId() {
    this.commentService.getCommentsByArticleId(this.articleId).subscribe(
      (res) => {
        this.comments = res;
        console.log(res);
      },
      (error) => {
        console.log('Error while fetching articles', 'ok');
      }
    );
  }
  isReplay(commentId: any) {
    this.isReplayed = !this.isReplayed;
    if (this.isReplayed) {
      this.commentId = commentId;
    } else {
      this.commentId = null;
      this.ngOnInit();
    }
  }

  replayComment() {
    const content = this.replayForm.get('content')?.value;

    this.commentService
      .createNewCommentReply(this.articleId, content, this.commentId)
      .subscribe(
        (res) => {
          console.log('Comment Published Successfully', 'ok');
          this.ngOnInit();
        },
        (error) => {
          console.log('Something Went Wrong!!!');
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
