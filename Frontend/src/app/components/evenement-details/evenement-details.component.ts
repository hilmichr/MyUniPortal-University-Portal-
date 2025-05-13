import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvisService } from 'src/app/service/avis.service';
import { EvenementService } from 'src/app/service/evenement.service';
import { GoogleAiService } from 'src/app/service/google-ai.service';

@Component({
  selector: 'app-evenement-details',
  templateUrl: './evenement-details.component.html',
  styleUrls: ['./evenement-details.component.css'],
})
export class EvenementDetailsComponent {
  eventId = this.activatedRoute.snapshot.params['id'];
  eventData: any;
  avis: any;
  submissionSuccess: boolean = false;
  countAvis: any;

  newAvis: any = {
    contenu: '',
    status: '',
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private evenementService: EvenementService,
    private avisService: AvisService,
    private activatedRoute: ActivatedRoute,
    private googleAiService: GoogleAiService // Inject GoogleAiService
  ) {}

  ngOnInit() {
    this.getEventById();
    this.getAvisByEvent();
    this.countAvisByStatus();
  }
  getEventById() {
    this.evenementService.getEvent(this.eventId).subscribe(
      (res) => {
        this.eventData = res;
        console.log(res);
      },
      (error) => {
        console.log('Event not found');
      }
    );
  }

  getAvisByEvent() {
    this.avisService.getAvisByEvent(this.eventId).subscribe((res) => {
      this.avis = res;
      console.log(res);
    });
  }
  countAvisByStatus() {
    this.evenementService.countAvisByStatus(this.eventId).subscribe(
      (res) => {
        this.countAvis = res;
        console.log(res);
      },
      (error) => {
        console.log('Event not found');
      }
    );
  }
}
