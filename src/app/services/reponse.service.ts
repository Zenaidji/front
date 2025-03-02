import { Injectable } from '@angular/core';
import { Reponse } from '../models/reponse';
@Injectable({
  providedIn: 'root',
})
export class ReponseService {
  public reponses: Reponse[] = [];

  questionText: string = '';

  addReponse(reponse: Reponse): void {
    this.reponses.push(reponse);
  }
  popResponse(): void {
    this.reponses.pop();
  }
}
