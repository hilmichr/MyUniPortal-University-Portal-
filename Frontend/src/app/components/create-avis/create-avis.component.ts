import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Avis } from 'src/app/model/Avis';
import { AvisService } from 'src/app/service/avis.service';
import { GoogleAiService } from 'src/app/service/google-ai.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-avis',
  templateUrl: './create-avis.component.html',
  styleUrls: ['./create-avis.component.css'],
})
export class CreateAvisComponent {
  avisForm!: FormGroup;
  aviis: any = [];
  eventId!: number;
  contenu: string = '';
  avis: Avis[] = [];
  submissionSuccess: boolean = false;

  constructor(
    private avisService: AvisService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient, // Ajout de HttpClient
    private route: ActivatedRoute, // Injectez ActivatedRoute ici
    private googleAiService: GoogleAiService // Inject GoogleAiService
  ) {}

  ngOnInit(): void {
    this.avisForm = this.formBuilder.group({
      contenu: ['', [Validators.required]], // Correction ici: Ajout du crochet fermant
    });
    this.route.params.subscribe((params) => {
      this.eventId = +params['id']; // Le '+' convertit la valeur en nombre
    });
  }

  async saveEvent() {
    if (this.avisForm.valid) {
      // Sortir de la fonction si un mot inapproprié est détecté
      const avisDescription = this.avisForm.value.contenu;
      this.googleAiService
        .generateStory(
          'Generate un opinion selon l avis et les emotions d utilisateur et la réponse doit être que avec un mot: positive, neutral or negative. L avis est ' +
            avisDescription
        )
        .subscribe(
          (res) => {
            const status = res.candidates[0].content.parts[0].text;

            const newAvis: Avis = {
              status: status,
              contenu: avisDescription,
            };

            this.avisService
              .addAvisAndAssignEvent(newAvis, this.eventId)
              .subscribe(
                (data) => {
                  alert('Avis added successfully '),
                    console.log('Avis added successfully:', data);
                  this.submissionSuccess = true;
                  this.router.navigate(['/evenement']);
                },
                (error) => {
                  // Handle errors here
                  console.error('Error adding comment:', error);
                  location.reload();

                  // Check for a specific error message and display a custom alert
                  if (error && typeof error === 'string') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: error,
                    });
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Comment contains inappropriate content or a subject that should not be posted here. Please review your post before submitting.',
                    });
                  }
                }
              );
          },
          (error) => console.error('Error generating status:', error)
        );
    } else {
      console.error("Le formulaire n'est pas valide.");
    }
  }

  onSubmit() {
    if (this.avisForm.valid) {
      this.saveEvent();
    } else {
      console.log(
        "Le formulaire n'est pas valide. Veuillez remplir tous les champs correctement."
      );
    }
  }
}
