import { Component } from '@angular/core';
import { StudentService } from "./student.service";
import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-crud';
  studentsList: any = []; //student list
  fetched = false;
  error = null;
  notAvailable: any;
  name = "";
  username="";
  address="";
  city="";
  isUpdate = false;
  updatedData = {};
  updateId : number;
  constructor(private studentService: StudentService) {}

  //fetches student data when page is loaded
  ngOnInit(id:number) {
    this.studentService.getStudent().subscribe(
      users => {
        this.studentsList = users;
        this.fetched = true;
      },
      error => {
        this.error = error.message;
        console.log(this.error);
      }
    );
    this.studentsList.splice(id,1);
  }

  //fetches student data on fetchStudent event
  fetchStudent() {
    this.notAvailable = false;
    this.studentService.getStudent().subscribe(
      users => {
        this.studentsList = users;
        console.log(this.studentsList)
      },
      error => {
        this.error = error.message;
        console.log(this.error);
      }
    );
  }

  //to ignore error
  ignoreError() {
    this.error = null;
    this.notAvailable = true;
  }

  //add student data
  onCreatePost(postData: {}) {
    this.name="";
    this.address="";
    this.city="";
    this.username="";
    this.studentService.addStudent(postData).subscribe(responseData => {
      this.studentsList.push(responseData);
    });
    
  }


  //sets the form field to the data that is to be updated
  onUpdate(iterator:number){
    this.isUpdate = true;
    this.updateId = this.studentsList[iterator].id;
    this.name = this.studentsList[iterator].name;
    this.username = this.studentsList[iterator].username;
    this.city = this.studentsList[iterator].city;
    this.address = this.studentsList[iterator].address;
  }

  //updates data through updateStudentData through services
  updateStudent(postData:{}){
    console.log(postData);
    this.isUpdate = false;
    this.name="";
    this.address="";
    this.city="";
    this.username="";
    this.studentService.updateStudentData(this.updateId, postData).subscribe((result:any)=>{});
  }

}
