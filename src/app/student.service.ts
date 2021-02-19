import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // url1 ="http://localhost:3000/users";
  url ="https://jsonplaceholder.typicode.com/users";
  constructor(private http: HttpClient) { }
  
  getStudent() {
    return this.http.get(this.url);
  }
  addStudent(data: {}) {
    // console.log(data);
    return this.http.post(this.url, data);
  }
  deleteStudentData(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }
  updateStudentData(id:any,data:{}){
    return this.http.put(`${this.url}/${id}`,data)
  }
}
