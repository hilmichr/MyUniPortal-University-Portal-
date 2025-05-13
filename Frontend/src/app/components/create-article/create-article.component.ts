import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/service/article.service';
import { find, get, pull } from 'lodash';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent {
  @ViewChild('tagInput') tagInputRef!: ElementRef;
  articleForm!: FormGroup;
  tags: string[] = [];
  blogImage!: File;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.articleForm = this.fb.group({
      tag: [undefined],
      title: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  onFileSelected(event: any) {
    console.log('file selected', event.target.files[0]);
    this.blogImage = event.target.files[0];
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.articleForm.controls['tag'].value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.articleForm.controls['tag'].setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
    console.log(this.tags);
  }

  createArticle() {
    const data = this.articleForm.value;
    data.tags = this.tags;

    this.articleService.createNewPost(data, this.blogImage).subscribe(
      (res) => {
        console.log('Your post was created successfully', 'Ok');
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log('Error creating the post', 'Ok');
      }
    );
  }
}
