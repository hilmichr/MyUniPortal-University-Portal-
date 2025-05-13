import { Component } from '@angular/core';
import { UniteEnseignementService } from 'src/app/service/unite-enseignement.service';

@Component({
  selector: 'app-ue-list',
  templateUrl: './ue-list.component.html',
  styleUrls: ['./ue-list.component.css'],
})
export class UeListComponent {
  allUniteEnseignements: any;
  constructor(private ueService: UniteEnseignementService) {}
  ngOnInit() {
    this.getAllUniteEnseignements();
  }
  getAllUniteEnseignements() {
    this.ueService.getAllUniteEnseignements().subscribe(
      (res) => {
        console.log(res);
        this.allUniteEnseignements = res;
      },
      (error) => {
        console.log('Error while fetching Unite Enseignements');
      }
    );
  }

  deleteUniteEnseignement(id: number) {
    if (confirm('Voulez-vous supprimer Unite Enseignement ?')) {
      this.ueService.removeUniteEnseignement(id).subscribe(
        (res) => {
          console.log(res);
          this.ngOnInit();
        },
        (error) => {
          console.log('Error while fetching Unite Enseignement');
        }
      );
    }
  }
}
