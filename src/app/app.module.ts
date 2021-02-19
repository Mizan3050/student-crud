import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { HttpClientModule } from "@angular/common/http";
import { IsUndefinedPipe } from "../app/pipe/checknull.pipe";

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    IsUndefinedPipe
  ],
  imports: [
    BrowserModule,FormsModule, ReactiveFormsModule,
    AppRoutingModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
