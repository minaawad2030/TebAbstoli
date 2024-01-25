import { Component } from '@angular/core';
import { QuestionsService } from 'src/services/questions.service';

@Component({
  selector: 'app-final-component',
  templateUrl: './final-component.component.html',
  styleUrls: ['./final-component.component.scss'],
})
export class FinalComponentComponent {
  constructor(public questionsService: QuestionsService) {}
}
