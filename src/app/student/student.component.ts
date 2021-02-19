import { Component, OnInit, Input } from '@angular/core';
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
  constructor() {}
  ngOnInit() {
    // console.log(this.studentData);
  }
  //update student component redirects to the update student form
  updateStudent(id: number) {
    this.newItemUpdate.emit(id);
    // console.log(id);
  }

  //deleting student component
  deleteStudent(id: number) {
      this.newItemEvent.emit(id);
  }
}
