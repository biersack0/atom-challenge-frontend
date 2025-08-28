import { Component } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    const userId = localStorage.getItem('1');
    // if (userId) {
    this.getTasks("2");
    // }
  }

  getTasks(userId: string) {
    this.taskService.getTasksByUser(userId).subscribe((response) => {
      console.log(response);
    });
  }
}
