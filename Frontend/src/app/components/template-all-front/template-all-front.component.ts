import { DOCUMENT } from '@angular/common';
import { Component, AfterViewInit, Inject } from '@angular/core';
@Component({
  selector: 'app-template-all-front',
  templateUrl: './template-all-front.component.html',
  styleUrls: ['./template-all-front.component.css'],
})
export class TemplateAllFrontComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.loadScript('/assets/assets-front/js/vendor/modernizr-3.6.0.min.js')
      .then(() =>
        this.loadScript('/assets/assets-front/js/vendor/jquery-1.12.4.min.js')
      )
      .then(() => this.loadScript('/assets/assets-front/js/bootstrap.min.js'))
      .then(() => this.loadScript('/assets/assets-front/js/slick.min.js'))
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.magnific-popup.min.js')
      )
      .then(() => this.loadScript('/assets/assets-front/js/waypoints.min.js'))
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.counterup.min.js')
      )
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.nice-select.min.js')
      )
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.nice-number.min.js')
      )
      .then(() =>
        this.loadScript('/assets/assets-front/js/jquery.countdown.min.js')
      )
      .then(() => this.loadScript('/assets/assets-front/js/validator.min.js'))
      .then(() => this.loadScript('/assets/assets-front/js/ajax-contact.js'))
      .then(() => this.loadScript('/assets/assets-front/js/main.js'))
      .then(() => this.loadScript('/assets/assets-front/js/map-script.js'))
      .catch((error) => console.error('Error loading scripts:', error));
  }
  loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.document.createElement('script');
      script.src = src;
      script.async = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = (error: Event | string) => {
        reject(error);
      };

      this.document.body.appendChild(script);
    });
  }
}
