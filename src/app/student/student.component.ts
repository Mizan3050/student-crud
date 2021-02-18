import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from "../student.service";
import { AppComponent } from "../app.component";
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  error = null;
  @Input() studentData: [];
  @Input() _id: number;
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() newItemUpdate = new EventEmitter<number>();
  constructor(private studentService :StudentService, private getFunction: AppComponent) {}
  ngOnInit() {

  }
  updateStudent(id: number) {
    console.log(id);
    this.newItemUpdate.emit(id);
  }
  deleteStudent(id: number) {
    this.studentService.deleteStudentData(id).subscribe(result => {
      console.log(id);
      this.newItemEvent.emit(id);
    });
  }
}
