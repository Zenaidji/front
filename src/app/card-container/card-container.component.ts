import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Card } from '../models/card';
import { Question } from '../models/question';
import { ReponseService } from '../services/reponse.service';

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
  previousQuestionId!: string;
  constructor(
    private cardService: CardService,
    private reponseService: ReponseService
  ) {
    this.cardService.getQuestionsByLevel('one').subscribe({
      next: (questions: Question[]) => {
        if (questions.length > 0) {
          this.previousQuestionId = questions[0]._id;
          this.reponseService.questionText = this.title;
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
    if (parentId != '' && parentId != null && parentId != undefined) {
      this.previousQuestionId = parentId;
      this.cardService.getQuestionById(parentId).subscribe({
        next: (question: Question) => {
          if (question.level != 'last') {
            this.title = question.label;
            this.reponseService.questionText = this.title;
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
      level: q.level,
    }));
  }

  getPreviousQuestion(): void {
    this.cardService.getQuestionById(this.previousQuestionId).subscribe({
      next: (question: Question) => {
        if (question.level === 'one') {
          this.cardService.getQuestionsByLevel('one').subscribe({
            next: (questions: Question[]) => {
              if (questions.length > 0) {
                this.cards = this.mapQuestionsToCards(questions);
                this.theme = true;
                this.title = 'Mon problème concerne';
                this.reponseService.popResponse();
              }
            },
          });
        } else {
          this.initCards(question.parent);
          this.reponseService.popResponse();
        }
        console.log('goback <=', this.reponseService.reponses);
      },
      error: (err) => console.error('Erreur :', err),
    });
  }

  //this.cardService.updateCurrentQuestion(questions[0]._id, true);
}
