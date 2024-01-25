import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question';
@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private httpClient: HttpClient) {}
  baseApi: string = 'https://localhost:7027/api';

  rightTeamTotalScore: number = 0;
  leftTeamTotalScore: number = 0;

  getQuestions() {
    return this.httpClient.get<Question[]>(`${this.baseApi}/Questions`);
  }
}
