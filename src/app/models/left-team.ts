import { Choice } from './Choice';

export class LeftTeam {
  blueScore: number = 0;
  orangeScore: number = 0;
  Choices: Choice[] = [
    new Choice('5', '1'),
    new Choice('F', 'Q'),
    new Choice('C', 'W'),
    new Choice('X', 'S'),
    new Choice('Z', 'A'),
  ];
}
