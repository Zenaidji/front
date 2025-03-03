import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/question';

  private currentQuestionId = new BehaviorSubject<string>('');
  private curentTheme = new BehaviorSubject<boolean>(true);
  private bonaAsavoir = new BehaviorSubject<boolean>(false);
  private formClient = new BehaviorSubject<boolean>(false);
  private cardManager = new BehaviorSubject<boolean>(true);
  currentQuestionId$: Observable<string> =
    this.currentQuestionId.asObservable();
  curentTheme$: Observable<boolean> = this.curentTheme.asObservable();
  bonaAsavoir$: Observable<boolean> = this.bonaAsavoir.asObservable();
  formClient$: Observable<boolean> = this.formClient.asObservable();
  cardManager$: Observable<boolean> = this.cardManager.asObservable();

  getQuestionsByParentId(parent: string): Observable<Question[]> {
    return this.http.get<Question[]>(
      `${this.apiUrl}/parent?parentId=${parent}`
    );
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}?id=${id}`);
  }

  getQuestionsByLevel(level: String): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/levels?level=${level}`);
  }

  updateCurrentQuestion(id: string, theme: boolean): void {
    this.currentQuestionId.next(id);
    this.curentTheme.next(theme);
  }

  updateBonaAsavoir(bonaAsavoir: boolean): void {
    this.bonaAsavoir.next(bonaAsavoir);
  }
  updateFormClient(formClient: boolean): void {
    this.formClient.next(formClient);
  }
  updateCardManager(cardManager: boolean): void {
    this.cardManager.next(cardManager);
  }
}
