import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from "../student.service";
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})


export class StudentComponent implements OnInit {
  error = null;

  // Recieving data from parent Component
  @Input() studentData:any;
  @Input() _id: number;

  //sending data to parent component
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() newItemUpdate = new EventEmitter<number>();
  constructor(private studentService :StudentService) {}
  ngOnInit() {

  }

  //update student component redirects to the update student form
  updateStudent(id: number) {
    console.log(id);
    this.newItemUpdate.emit(id);
  }

  //deleting student component
  deleteStudent(id: number) {
    this.studentService.deleteStudentData(id).subscribe(result => {
      console.log(id);
      this.newItemEvent.emit(id);
    });
  }
}
