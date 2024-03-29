import { Question } from 'src/app/models/question';
import { QuestionsService } from './../../../services/questions.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RightTeam } from 'src/app/models/right-team';
import { LeftTeam } from 'src/app/models/left-team';
import { questionsArr } from 'src/app/models/questions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  currrentQuestion: Question = new Question();
  index = 0;
  isOrangeTrue: Boolean = false;
  isBlueTrue: boolean = false;
  rightTeam: RightTeam = new RightTeam();
  leftTeam: LeftTeam = new LeftTeam();

  questionTotalScoreBlocked = false;
  constructor(
    public questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questions = questionsArr;
    this.activatedRoute.queryParamMap.subscribe({
      next: (res) => {
        let tempIndex = res.get('question');
        if (tempIndex) {
          this.index = Number.parseInt(tempIndex);
          if (this.index - 1 < this.questions.length) {
            this.currrentQuestion = this.questions[this.index - 1];
            console.log(this.currrentQuestion);
          } else {
            this.router.navigate(['final']);
          }
        } else {
          this.router.navigate([''], { queryParams: { question: '1' } });
        }
      },
    });

    // this.questionsService.getQuestions().subscribe({
    //   next: (res) => {
    //     this.questions = res;
    //     this.currrentQuestion = this.questions[this.index - 1];
    //     console.log(this.currrentQuestion);
    //   },
    // });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    //r for reset questions
    if (event.key == 'r' || event.key == 'R') this.questionReset();
    //SPACE for move to next question
    else if (event.key == ' ') this.changeParams();
    // . To calculate Score
    else if (event.key == '.') {
      this.calculateTotalScore();
    }
    //BLUE TEAM
    const currenBluetIndex = this.rightTeam.Choices.findIndex(
      (x) => x.blueLetter == event.key || x.orangeLetter == event.key
    );
    if (
      currenBluetIndex != -1 &&
      !this.rightTeam.Choices[currenBluetIndex].groupBlocked
    ) {
      if (this.rightTeam.Choices[currenBluetIndex].blueLetter == event.key) {
        this.rightTeam.blueScore++;
      } else {
        this.rightTeam.orangeScore++;
      }
      this.rightTeam.Choices[currenBluetIndex].groupBlocked = true;
    } else if (currenBluetIndex == -1) {
      //LEFT TEAM
      const currentOrangeIndex = this.leftTeam.Choices.findIndex(
        (x) => x.blueLetter == event.key || x.orangeLetter == event.key
      );
      if (
        currentOrangeIndex != -1 &&
        !this.leftTeam.Choices[currentOrangeIndex].groupBlocked
      ) {
        if (this.leftTeam.Choices[currentOrangeIndex].blueLetter == event.key) {
          this.leftTeam.blueScore++;
        } else {
          this.leftTeam.orangeScore++;
        }
        this.leftTeam.Choices[currentOrangeIndex].groupBlocked = true;
      }
    }
    console.log(this.rightTeam);
    console.log(this.leftTeam);
  }

  changeParams() {
    if (this.isAllButtonsClicked()) {
      this.calculateTotalScore();
      this.questionReset();
      this.router.navigate([''], { queryParams: { question: this.index + 1 } });
    }
  }

  isAllButtonsClicked(): boolean {
    const rightTeamTotalAnswerCount =
      this.rightTeam.blueScore + this.rightTeam.orangeScore;
    const leftTeamTotalAnswerCount =
      this.leftTeam.blueScore + this.leftTeam.orangeScore;
    if (rightTeamTotalAnswerCount >= 5 && leftTeamTotalAnswerCount >= 5)
      return true;
    return false;
  }

  calculateTotalScore() {
    if (this.isAllButtonsClicked() && !this.questionTotalScoreBlocked) {
      this.isBlueTrue = this.currrentQuestion.answers[0].isCorrect;
      this.isOrangeTrue = this.currrentQuestion.answers[1].isCorrect;
      const isRightMostBlue =
        this.rightTeam.blueScore > this.rightTeam.orangeScore;
      const isLeftMostOrange =
        this.leftTeam.orangeScore > this.leftTeam.blueScore;
      if (this.isBlueTrue) {
        if (
          this.leftTeam.blueScore > this.rightTeam.blueScore &&
          (isRightMostBlue || !isLeftMostOrange)
        ) {
          this.questionsService.leftTeamTotalScore++;
        } else if (
          this.rightTeam.blueScore > this.leftTeam.blueScore &&
          (isRightMostBlue || !isLeftMostOrange)
        ) {
          this.questionsService.rightTeamTotalScore++;
        } else if (
          this.rightTeam.blueScore == this.leftTeam.blueScore &&
          (isRightMostBlue || !isLeftMostOrange)
        ) {
          this.questionsService.leftTeamTotalScore++;
          this.questionsService.rightTeamTotalScore++;
        }
        this.questionTotalScoreBlocked = true;
      } else if (this.isOrangeTrue) {
        if (
          this.leftTeam.orangeScore > this.rightTeam.orangeScore &&
          (isLeftMostOrange || !isRightMostBlue)
        )
          this.questionsService.leftTeamTotalScore++;
        else if (
          this.leftTeam.orangeScore < this.rightTeam.orangeScore &&
          (isLeftMostOrange || !isRightMostBlue)
        )
          this.questionsService.rightTeamTotalScore++;
        else if (
          this.rightTeam.orangeScore == this.leftTeam.orangeScore &&
          (isLeftMostOrange || !isRightMostBlue)
        ) {
          this.questionsService.leftTeamTotalScore++;
          this.questionsService.rightTeamTotalScore++;
        }
        this.questionTotalScoreBlocked = true;
      }
    }
  }
  questionReset() {
    this.rightTeam = new RightTeam();
    this.leftTeam = new LeftTeam();
    this.questionTotalScoreBlocked = false;
    this.isBlueTrue = false;
    this.isOrangeTrue = false;
  }
}
