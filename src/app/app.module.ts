import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './component/question/question.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FinalComponentComponent } from './component/final-component/final-component.component';

@NgModule({
  declarations: [AppComponent, QuestionComponent, FinalComponentComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
