import { Component } from '@angular/core';

import { FooterComponent } from './footer/footer.component';
import { CardManagerComponent } from './card-manager/card-manager.component';
import { OnInit } from '@angular/core';
import { CardService } from './services/card.service';
import { BonASavoirComponent } from './bon-a-savoir/bon-a-savoir.component';
import { ClientformComponent } from './clientform/clientform.component';

@Component({
  selector: 'app-root',
  imports: [
    FooterComponent,
    CardManagerComponent,
    BonASavoirComponent,
    ClientformComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private cardService: CardService) {}
  bonaAsavoir = false;
  formClient = false;
  cardManager = true;
  title = 'front';
  ngOnInit(): void {
    this.cardService.bonaAsavoir$.subscribe((bonaAsavoir: boolean) => {
      this.bonaAsavoir = bonaAsavoir;
      console.log('bonaAsavoir', this.bonaAsavoir);
    });
    this.cardService.formClient$.subscribe((formClient: boolean) => {
      this.formClient = formClient;
    });

    this.cardService.cardManager$.subscribe((cardManager: boolean) => {
      this.cardManager = cardManager;
    });
  }
}
