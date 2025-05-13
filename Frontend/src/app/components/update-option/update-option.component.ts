import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forEach } from 'lodash';
import { OptionsService } from 'src/app/service/options.service';
import { UniteEnseignementService } from 'src/app/service/unite-enseignement.service';

@Component({
  selector: 'app-update-option',
  templateUrl: './update-option.component.html',
  styleUrls: ['./update-option.component.css'],
})
export class UpdateOptionComponent {
  optionForm!: FormGroup;
  optionId = this.activatedRoute.snapshot.params['id'];
  optionData: any;
  coefOptions: any = [];
  categories: String[] = ['TC', 'IT', 'GL', 'GE'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private optionService: OptionsService,
    private activatedRoute: ActivatedRoute,
    private uniteEnseignementService: UniteEnseignementService
  ) {}

  ngOnInit() {
    this.optionForm = this.fb.group({
      id: [null, ''],
      nom: [null, Validators.required],
      description: [null, Validators.required],
      categorieSpecialite: [null, Validators.required],
      pdfFile: [null, ''],
      coefOptions: [null, ''],
    });
    this.getOptionById();
    this.getallue();
  }

  getOptionById() {
    this.optionService.getOptionById(this.optionId).subscribe(
      (res) => {
        this.optionForm.patchValue(res);
        console.log(this.optionData);
        this.coefOptions = res.coefOptions;
      },
      (error) => {
        console.log('Option not found');
      }
    );
  }

  updateOption() {
    const data = this.optionForm.value;
    data.coefOptions = this.coefOptions;
    console.log(data);
    this.optionService.modifySpecialite(data).subscribe(
      (res) => {
        console.log('Your post was modifyed successfully', 'Ok');
        this.router.navigateByUrl('/dashboard/all-Options');
      },
      (error) => {
        console.log('Error modifyed the post', 'Ok');
      }
    );
  }

  lista: any;
  getallue() {
    this.uniteEnseignementService.getAllUniteEnseignements().subscribe(
      (res) => {
        this.lista = res;
        console.log(this.lista);
      },
      (error) => {
        console.log('Error');
      }
    );
  }

  isExist(id: number): boolean {
    const data = this.optionForm.value;
    for (let i = 0; i < data.coefOptions.length; i++) {
      if (this.optionForm.value.coefOptions[i].uniteEnseignement.id === id) {
        return true;
      }
    }
    return false;
  }

  onChange(event: any, id: any) {
    if (event.target.checked) {
      const inputValue = (
        document.getElementById(id + 10000) as HTMLInputElement
      ).value;
      console.log(inputValue);
      console.log(event.target.value);
      this.coefOptions.push({
        uniteEnseignement: { id: event.target.value },
        coefficient: inputValue,
      });
      console.log(this.coefOptions);
    } else {
      const index = this.coefOptions.findIndex(
        (item: any) => item.id === event.target.value
      );
      this.coefOptions.splice(index, 1);
    }
  }
}
