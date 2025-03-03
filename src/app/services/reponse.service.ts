import { Injectable } from '@angular/core';
import { Reponse } from '../models/reponse';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ReponseService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/response';

  public reponses: Reponse[] = [];

  questionText: string = '';

  addReponse(reponse: Reponse): void {
    this.reponses.push(reponse);
  }
  popResponse(): void {
    this.reponses.pop();
  }

  createResponse() {
    console.log('Envoi des réponses...', { question: this.reponses });
    return this.http.post(`${this.apiUrl}`, { question: this.reponses });
  }
}
