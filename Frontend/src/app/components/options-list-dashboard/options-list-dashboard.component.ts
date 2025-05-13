import { Component } from '@angular/core';
import { OptionsService } from 'src/app/service/options.service';

@Component({
  selector: 'app-options-list-dashboard',
  templateUrl: './options-list-dashboard.component.html',
  styleUrls: ['./options-list-dashboard.component.css'],
})
export class OptionsListDashboardComponent {
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

  deleteOption(id: number) {
    if (confirm('Voulez-vous supprimer option ?')) {
      this.optionsService.removeSpecialite(id).subscribe(
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
