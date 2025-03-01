import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Card } from '../models/card';
import { Question } from '../models/question';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css'],
  imports: [CommonModule, CardComponent],
  standalone: true,
})
export class CardContainerComponent implements OnInit {
  cards: Card[] = [];
  title = 'Mon problème concerne';
  fstQuestionId!: string;
  theme!: boolean;
  constructor(private cardService: CardService) {
    this.cardService.getQuestionsByLevel('one').subscribe({
      next: (questions: Question[]) => {
        if (questions.length > 0) {
          console.log('Questions :', questions);
          this.cards = this.mapQuestionsToCards(questions);
        }
      },
    });
  }
  getRowIndices(): number[] {
    return Array.from(
      { length: Math.ceil(this.cards.length / 3) },
      (_, i) => i * 3
    );
  }

  initCards(parentId: string): void {
    console.log('QuestparentIdions :', parentId);
    if (parentId != '' && parentId != null && parentId != undefined) {
      this.cardService.getQuestionById(parentId).subscribe({
        next: (question: Question) => {
          if (question.level != 'last') {
            this.title = question.label;
          }
        },
      });
    }

    this.cardService.getQuestionsByParentId(parentId).subscribe({
      next: (questions: Question[]) => {
        if (questions.length > 0) {
          this.cards = this.mapQuestionsToCards(questions);
        }
      },
    });
  }

  ngOnInit(): void {
    this.cardService.currentQuestionId$.subscribe((id: string) => {
      this.initCards(id);
    });
    this.cardService.curentTheme$.subscribe((t: boolean) => {
      this.theme = t;
    });
  }

  private mapQuestionsToCards(questions: any[]): Card[] {
    return questions.map((q) => ({
      icon: q.icon,
      title: q.text,
      type: q.level === 'one' ? 'dark' : 'light',
      url: q._id,
    }));
  }

  // getPreviousQuestion(): void {
  //   this.cardService.getQuestionById(this.previousQuestionId).subscribe({
  //     next: (question) => {
  //       this.title = question.label;
  //       this.previousQuestionId = question.parentID;
  //     },
  //     error: (err) => console.error('Erreur :', err),
  //     complete: () => {
  //       if (this.previousQuestionId) {
  //         this.initCards(this.previousQuestionId);
  //       } else {
  //       }
  //     },
  //   });
  // }

  //this.cardService.updateCurrentQuestion(questions[0]._id, true);
}
