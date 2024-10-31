import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/model/Event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  eventForm!: FormGroup;
  /* selectedFile: File | null = null;*/
  message: string = '';

  imgURL: any;
  // image things ***************************
  image!: File;
  imageMin: File | null = null;
  uploadingFile: boolean = false;
  //***************************************** */
  event: Event = {
    id: 0,
    nom: '',
    type: '',
    nbrPlace: 0,
    date_fin: new Date(),
    date_deb: new Date(),
    lieu: '',
  };

  constructor(
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient // Ajout de HttpClient
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      nom: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.containsNumberValidator,
        ],
      ],
      lieu: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.containsNumberValidator,
        ],
      ],
      nbrPlace: ['', [Validators.required]],
      date_deb: ['', [Validators.required]],
      date_fin: ['', [Validators.required]],
      image: ['', []],
      type: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.containsNumberValidator,
        ],
      ],
    });
  }

  containsNumberValidator(control: AbstractControl) {
    const value = control.value;
    const containsNumber = /\d/.test(value);
    return containsNumber ? { containsNumber: true } : null;
  }

  saveEvent() {
    this.event.nom = this.eventForm.value.nom;
    this.event.nom = this.eventForm.value.type;
    this.event.lieu = this.eventForm.value.lieu;
    this.event.date_deb = this.eventForm.value.date_deb;
    this.event.date_fin = this.eventForm.value.date_fin;
    this.event.nbrPlace = this.eventForm.value.nbrPlace;

    this.eventService.upload(this.image).subscribe((data) => {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

      this.event.imagecloud = data;
      console.log(this.event.imagecloud);
      this.eventService.addEvent(this.event).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/evenement']);
        },
        (error) => console.log(error)
      );
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
      this.saveEvent();
      /*this.uploadFile(); // Appeler la méthode pour uploader le fichier ici*/
    } else {
      console.log(
        "Le formulaire n'est pas valide. Veuillez remplir tous les champs correctement."
      );
    }
  }
  /* uploadFile(event: Event): void {
    // Utilisation d'une assertion de type pour accéder aux fichiers
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files ? inputElement.files[0] : null;

    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      this.http.post('http://votre-domaine.com/image/upload', formData).subscribe(
        (response: any) => {
          this.message = 'Upload réussi : ' + response.message;
        },
        (error) => {
          console.error('Erreur lors de l\'upload', error);
          this.message = 'Erreur lors de l\'upload : ' + error.message;
        }
      );
    }
  } */

  /*   onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files ? inputElement.files[0] : null;

    if (file) {
      this.eventService.uploadImage(file).subscribe(
        (response: any) => {
          console.log('Upload réussi :', response);
          // Faire quelque chose avec la réponse si nécessaire
        },
        (error) => {
          console.error('Erreur lors de l\'upload', error);
          // Gérer l'erreur
        }
      );
    }
  } */
  onFileChangeClou(event: any) {
    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
  }
}

/*onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }*/

/*uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      this.http.post('http://localhost:8080/api/evenement/upload', formData)
        .subscribe(response => {
          console.log('File uploaded successfully');
        }, error => {
          console.error('Error uploading file:', error);
        });
    } else {
      console.error('No file selected');
    }
  }*/
