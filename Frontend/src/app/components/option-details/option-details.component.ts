import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionsService } from 'src/app/service/options.service';

@Component({
  selector: 'app-option-details',
  templateUrl: './option-details.component.html',
  styleUrls: ['./option-details.component.css'],
})
export class OptionDetailsComponent {
  optionId = this.activatedRoute.snapshot.params['id'];
  optionData: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private optionsService: OptionsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getOptionById();
  }

  getOptionById() {
    this.optionsService.getOptionById(this.optionId).subscribe(
      (res) => {
        this.optionData = res;
        console.log(res);
      },
      (error) => {
        console.log('Article not found');
      }
    );
  }
}
