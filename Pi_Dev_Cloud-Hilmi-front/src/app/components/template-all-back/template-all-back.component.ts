import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-template-all-back',
  templateUrl: './template-all-back.component.html',
  styleUrls: ['./template-all-back.component.css'],
})
export class TemplateAllBackComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.loadScript(
      '/assets/assets-back/vendor/bootstrap/dist/js/bootstrap.bundle.min.js'
    )
      .then(() =>
        this.loadScript(
          '/assets/assets-back/vendor/purecounterjs/dist/purecounter_vanilla.js'
        )
      )
      .then(() =>
        this.loadScript(
          '/assets/assets-back/vendor/apexcharts/js/apexcharts.min.js'
        )
      )
      .then(() =>
        this.loadScript(
          '/assets/assets-back/vendor/overlay-scrollbar/js/overlayscrollbars.min.js'
        )
      )
      .then(() => this.loadScript('/assets/assets-back/js/functions.js'))
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
