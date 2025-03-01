import { Component } from '@angular/core';

import { FooterComponent } from './footer/footer.component';
import { CardManagerComponent } from './card-manager/card-manager.component';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, CardManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front';
}
