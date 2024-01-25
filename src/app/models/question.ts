import { Choice } from './Choice';
import { Answer } from './answer';

export class Question {
  id!: number;
  content!: string;
  answers!: Answer[];
}
