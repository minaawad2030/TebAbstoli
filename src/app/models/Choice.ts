export class Choice {
  constructor(orangeLetter: string, blueLetter: string) {
    this.orangeLetter = orangeLetter;
    this.blueLetter = blueLetter;
  }
  orangeLetter: string;
  blueLetter: string;
  // blue: boolean = false;
  // orange: boolean = false;
  groupBlocked: boolean = false;
}
