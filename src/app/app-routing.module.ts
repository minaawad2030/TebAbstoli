import { QuestionComponent } from './component/question/question.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalComponentComponent } from './component/final-component/final-component.component';

const routes: Routes = [
  { path: '', component: QuestionComponent },
  {
    path: 'final',
    component: FinalComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
