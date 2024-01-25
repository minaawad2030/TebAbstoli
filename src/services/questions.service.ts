import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question';
@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private httpClient: HttpClient) {}
  baseApi: string = 'https://localhost:7027/api';
  getQuestions() {
    return this.httpClient.get<Question[]>(`${this.baseApi}/Questions`);
  }
}
