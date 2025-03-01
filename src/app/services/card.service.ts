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
  currentQuestionId$: Observable<string> =
    this.currentQuestionId.asObservable();
  curentTheme$: Observable<boolean> = this.curentTheme.asObservable();

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
}
