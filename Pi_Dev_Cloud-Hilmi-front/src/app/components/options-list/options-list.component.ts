import { Component } from '@angular/core';
import { OptionsService } from 'src/app/service/options.service';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.css'],
})
export class OptionsListComponent {
  allOptions: any;

  constructor(private optionsService: OptionsService) {}

  ngOnInit() {
    this.getAllOptions();
  }

  getAllOptions() {
    this.optionsService.getAllOptions().subscribe(
      (res) => {
        console.log(res);
        this.allOptions = res;
      },
      (error) => {
        console.log('Error while fetching options');
      }
    );
  }
}
