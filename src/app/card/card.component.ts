import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../services/card.service';

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
  isHovered = false;
  constructor(private cardService: CardService) {}

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
      this.cardService.updateCurrentQuestion(this.url, false);
    }
  }
}
