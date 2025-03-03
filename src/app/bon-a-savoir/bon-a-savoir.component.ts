import { Component } from '@angular/core';
import { CardService } from '../services/card.service';
import { ReponseService } from '../services/reponse.service';
@Component({
  selector: 'app-bon-a-savoir',
  imports: [],
  templateUrl: './bon-a-savoir.component.html',
  styleUrl: './bon-a-savoir.component.css',
})
export class BonASavoirComponent {
  constructor(
    private cardService: CardService,
    reponseService: ReponseService
  ) {}

  setFormClient(): void {
    this.cardService.updateBonaAsavoir(false);
    this.cardService.updateFormClient(true);
  }
}
