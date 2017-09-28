import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
  endpoint = 'http://localhost:3000/api';

  constructor(private http: Http) {
    console.log('Task Service Initialized...');
  }

  getTasks() {
    return this.http.get(
      this.endpoint + '/tasks')
    .map(res => res.json());
  }

  getTask(id) {
    return this.http.get(
      this.endpoint + '/task/' + id)
    .map(res => res.json());
  }

  addTask(newTask) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.endpoint + '/task',
      JSON.stringify(newTask),
      {headers: headers})
    .map(res => res.json());
  }

  deleteTask(id) {
    return this.http.delete(
      this.endpoint + '/task/' + id)
    .map(res => res.json());
  }

  updateTask(task) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      this.endpoint + '/task/' + task._id,
      JSON.stringify(task),
      {headers: headers})
    .map(res => res.json());
  }
}
