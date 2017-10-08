import { Component } from '@angular/core';

import { TaskService } from './../../../services/task.service';
import { Task } from './../../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService]
})

export class TasksComponent {

  tasks: Task[];
  title: string;
  currentPage: number;
  pageSize: number;
  q: string;
  filteredTasks: Task[];

  constructor(private taskService: TaskService) {
    this.tasks = [];
    this.filteredTasks = [];
    this.pageSize = 3;
    this.q = '';

    if ( this.tasks == null || this.tasks.length === 0 ) {
      this.getTasks();
    }
  }


  getTasks() {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
        this.currentPage = 1;
      });
  }

  addTask(ev) {
    if (ev.keyCode === 13 && this.title !== '') {
      const newTask = {
        title: this.title,
        isDone: false
      }

      this.taskService.addTask(newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.title = '';
        });
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id)
      .subscribe(data => {
        if (data.n === 1) {
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i]._id === id) {
              this.tasks.splice(i, 1);
            }
          }
        }
      });
  }

  updateTask(task) {
    const updTask = {
      _id: task._id,
      title: task.title,
      isDone: task.isDone
    };

    this.taskService.updateTask(updTask)
      .subscribe(data => {
        if (data.n === 1) {
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i]._id === updTask._id) {
              this.tasks[i] = updTask;
            }
          }
        }
      });
  }

  filterTask() {
    if (this.q) {
      this.assignCopy();
    }

    this.filteredTasks = Object.assign([], this.tasks)
      .filter( (task) => task.title.toLowerCase().indexOf(this.q.toLowerCase()) > -1);
      // .filter( (task) => JSON.stringify(task).toLowerCase().indexOf(this.q.toLowerCase()) > -1)

    this.currentPage = 1;
  }

  private assignCopy() {
    this.filteredTasks = Object.assign([], this.tasks);
  }

  numberOfPages() {
    if (this.pageSize !== 0) {
      return Math.ceil(this.filteredTasks.length / this.pageSize);
    } else if (this.pageSize <= 0 || this.pageSize == null) {
      return this.filteredTasks.length;
    }
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }

}
