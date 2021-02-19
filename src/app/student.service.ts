import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url1 ="http://localhost:3000/users";
  url ="https://jsonplaceholder.typicode.com";
  constructor(private http: HttpClient) { }
  
  getStudent() {
    return this.http.get(`${this.url}/${'users'}`);
  }
  addStudent(data: {}) {
    // console.log(data);
    return this.http.post(`${this.url}/${'posts'}`, data);
  }
  deleteStudentData(id: any) {
    return this.http.delete(`${this.url}/${'posts'}/${id}`);
  }
  updateStudentData(id:any,data:{}){
    return this.http.put(`${this.url}/${'posts'}/${id}`,data)
  }
}
