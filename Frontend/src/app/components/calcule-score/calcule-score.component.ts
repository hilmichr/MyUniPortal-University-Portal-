import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionsService } from 'src/app/service/options.service';
import { UniteEnseignementService } from 'src/app/service/unite-enseignement.service';

@Component({
  selector: 'app-calcule-score',
  templateUrl: './calcule-score.component.html',
  styleUrls: ['./calcule-score.component.css'],
})
export class CalculeScoreComponent {
  allUE: any;
  moyUEList: any = [];
  scoreForm!: FormGroup;
  data: any = {};
  allScore: any = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uniteEnseignementService: UniteEnseignementService,
    private optionsService: OptionsService
  ) {}
  ngOnInit() {
    this.scoreForm = this.fb.group({
      moyenneGenerale: [null, Validators.required],
    });
    this.getallue();
  }
  getallue() {
    this.uniteEnseignementService.getAllUniteEnseignements().subscribe(
      (res) => {
        this.allUE = res;
        console.log(this.allUE);
      },
      (error) => {
        console.log('Error');
      }
    );
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  calculeScore() {
    this.data = {};
    for (let index = 0; index < this.moyUEList.length; index++) {
      this.data[this.moyUEList[index].id] = this.moyUEList[index].moyUE;
    }
    console.log(this.data);
    console.log(this.scoreForm.value.moyenneGenerale);
    this.optionsService
      .calculeScore(this.data, this.scoreForm.value.moyenneGenerale)
      .subscribe(
        (res) => {
          this.allScore = res;
          console.log(this.allScore);
          console.log(typeof this.allScore);
        },
        (error) => {
          console.log('Error');
        }
      );
  }
  onChange(event: any, id: any) {
    if (event.target.value != '') {
      console.log(event.target.value);
      this.moyUEList.push({
        id: id,
        moyUE: event.target.value,
      });
      console.log(this.moyUEList);
    } else {
      const index = this.moyUEList.findIndex(
        (item: any) => item.id === event.target.value
      );
      this.moyUEList.splice(index, 1);
      console.log(this.moyUEList);
    }
  }
}
