import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../services/card.service';
import { Reponse } from '../models/reponse';
import { ReponseService } from '../services/reponse.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() type!: string;
  @Input() url!: string;
  @Input() level!: string;
  isHovered = false;
  constructor(
    private cardService: CardService,
    private reponseService: ReponseService
  ) {}

  getNexQuestions(): void {
    if (
      ![
        'Electricite',
        'Chauffage',
        'serrurerie',
        'vitrerie',
        'Electromenager',
      ].includes(this.title)
    ) {
      if (this.level != 'last') {
        this.cardService.updateCurrentQuestion(this.url, false);
      } else {
        this.cardService.updateBonaAsavoir(true);
        this.cardService.updateCardManager(false);
        localStorage.setItem('responses', JSON.stringify(this.reponseService));
      }
      const reponse: Reponse = {
        question_text: this.reponseService.questionText,
        response: this.title,
      };
      this.reponseService.addReponse(reponse);
      console.log('next =>', this.reponseService.reponses);
    }
  }
}
