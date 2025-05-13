import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
})
export class UpdateEventComponent {
  eventForm!: FormGroup;
  eventId = this.activatedRoute.snapshot.params['id'];
  image: any;
  imageMin: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      id: [null, []],
      nom: [null, Validators.required],
      nbrPlace: [null, Validators.required],
      date_deb: [null, Validators.required],
      date_fin: [null, Validators.required],
      lieu: [null, Validators.required],
      type: [null, Validators.required],
      image: [null, []],
    });
    this.getEventById();
  }

  getEventById() {
    this.eventService.getEvent(this.eventId).subscribe(
      (res) => {
        this.eventForm.patchValue(res);
      },
      (error) => {
        console.log('Event not found');
      }
    );
  }

  updateEvent() {
    const data = this.eventForm.value;

    this.eventService.updateEvent(data).subscribe(
      (res) => {
        console.log('Your Event was modifyed successfully', 'Ok');
        this.router.navigateByUrl('/dashboard/event-list');
      },
      (error) => {
        console.log('Error modifyed the Event', 'Ok');
      }
    );
  }
}
