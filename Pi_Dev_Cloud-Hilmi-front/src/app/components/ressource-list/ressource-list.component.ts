import { Component } from '@angular/core';
import { RessourcesService } from 'src/app/service/ressources.service';

@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css'],
})
export class RessourceListComponent {
  allRessources: any;
  constructor(private ressourcesService: RessourcesService) {}
  ngOnInit() {
    this.getAllRessources();
  }
  getAllRessources() {
    this.ressourcesService.getAllRessources().subscribe(
      (res) => {
        console.log(res);
        this.allRessources = res;
      },
      (error) => {
        console.log('Error while fetching Ressources');
      }
    );
  }

  deleteRessources(id: number) {
    if (confirm('Voulez-vous supprimer Ressources ?')) {
      this.ressourcesService.deleteRessources(id).subscribe(
        (res) => {
          console.log(res);
          this.ngOnInit();
        },
        (error) => {
          console.log('Error while fetching Ressources');
        }
      );
    }
  }
}
