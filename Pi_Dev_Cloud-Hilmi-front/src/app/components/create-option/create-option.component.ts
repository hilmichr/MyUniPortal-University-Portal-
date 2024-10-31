import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionsService } from 'src/app/service/options.service';
import { UniteEnseignementService } from 'src/app/service/unite-enseignement.service';

@Component({
  selector: 'app-create-option',
  templateUrl: './create-option.component.html',
  styleUrls: ['./create-option.component.css'],
})
export class CreateOptionComponent {
  @ViewChild('tagInput') tagInputRef!: ElementRef;
  optionForm!: FormGroup;
  optionPdf!: File;
  categories: String[] = ['TC', 'IT', 'GL', 'GE'];
  coefOptions: any = [];
  coefInput!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private optionsService: OptionsService,
    private uniteEnseignementService: UniteEnseignementService
  ) {}

  ngOnInit() {
    this.optionForm = this.fb.group({
      nom: [null, Validators.required],
      description: [null, Validators.required],
      categorieSpecialite: [null, Validators.required],
    });
    this.getallue();
  }

  onFileSelected(event: any) {
    console.log('file selected', event.target.files[0]);
    this.optionPdf = event.target.files[0];
  }

  createOption() {
    const data = this.optionForm.value;
    data.coefOptions = this.coefOptions;
    console.log(data);

    this.optionsService.addSpecialite(data, this.optionPdf).subscribe(
      (res) => {
        console.log('Your option was created successfully', 'Ok');
        this.router.navigateByUrl('/dashboard/all-Options');
      },
      (error) => {
        console.log('Error creating the option', 'Ok');
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
