import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { CardContainerComponent } from '../card-container/card-container.component';

@Component({
  selector: 'app-card-manager',
  standalone: true,
  imports: [CardContainerComponent],
  templateUrl: './card-manager.component.html',
  styleUrl: './card-manager.component.css',
})
export class CardManagerComponent {
  constructor(private cardService: CardService) {}

  // ngOnInit(): void {
  //   this.cardService.getQuestionsByParentId('').subscribe({
  //     next: (questions) => {
  //       if (questions.length > 0) {
  //         this.cardService.updateCurrentQuestion(questions[0]._id, false);
  //       }
  //     },
  //     error: (err) => console.error('Erreur :', err),
  //   });
  // }
}
