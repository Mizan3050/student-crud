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
  studentsList: any; //student list
  fetched = false;
  error = null;
  notAvailable = false;
  name = "";
  username= "";
  address= "";
  city= "";
  studentUpdateId : number;
  isUpdate = false;
  // updatedData : {};
  updateId : number;
  dataLength:number = 0;
  constructor(private studentService: StudentService) {}

  //fetches student data when page is loaded
  ngOnInit() {
    this.studentService.getStudent().subscribe((users:[]) => {
        this.studentsList = users;
        this.fetched = true;
        this.dataLength = users.length;
        this.dataLength=this.studentsList[this.dataLength-1].id; //id of last object in id

        //checks if array is empty
        if(users.length>1){
          this.notAvailable =false;
        }
        else{
          this.notAvailable=true;
        }
        
      },
      error => {
        this.error = error.message;
        console.log(this.error);
      }
    );
    
  }

  //fetches student data on fetchStudent event
  fetchStudent() {
    
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
  }

  //add student data
  onCreatePost(studentData: {id:number, name: string, username: string, address: string, city: string}) {
    this.name="";
    this.address="";
    this.city="";
    this.username="";
    studentData.id = this.dataLength+1;
    this.dataLength++;
    // console.log(studentData);
    //post request to add student info to server
    this.studentService.addStudent(studentData).subscribe(responseData => {
      //appending studentInfo on dom array 
      this.studentsList.push(studentData);
    },
    error => {
      this.error = error.message;
      console.log(this.error);
    });
    
  }


  //sets the form field to the data that is to be updated
  onUpdate(iterator:number){
    this.isUpdate = true;
    this.studentUpdateId = this.studentsList[iterator].id;
    this.updateId = iterator;
    this.name = this.studentsList[iterator].name;
    this.username = this.studentsList[iterator].username;
    if(this.studentsList[iterator].city){
      this.city = this.studentsList[iterator].city;
      this.address = this.studentsList[iterator].address;
    }
    else{
      this.city = this.studentsList[iterator].address.city;
      this.address = this.studentsList[iterator].address.street;
    }
    
    console.log(iterator);
    console.log(this.studentsList[iterator]);
}

  //updates data through updateStudentData through services
  updateStudent(studentData:{id:number, name: string, username: string, address: string, city: string}){
    console.log(studentData);
    this.isUpdate = false;
    this.name="";
    this.address="";
    this.city="";
    this.username="";
    studentData.id = this.studentUpdateId;
    
    // console.log(this.studentsList[this.updateId]);

    //put request to update on server
    this.studentService.updateStudentData(this.studentUpdateId, studentData).subscribe(()=>{

      //updating studentList array on dom
      this.studentsList[this.updateId]=studentData;
    },
    error => {
      this.error = error.message;
      console.log(this.error);
    });
  }

  
  trackByStudentId(index: number, student:any): string{
    return student.id;
  }

  deleteStudentData(_id:number){
    console.log(this.studentsList[_id].id);
    //delete request to server
    this.studentService.deleteStudentData(this.studentsList[_id].id).subscribe(() => {
      //deleting from dom array
      this.studentsList.splice(_id,1);
    },
    error => {
      this.error = error.message;
      console.log(this.error);
    });
  
  }
}
