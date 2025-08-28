import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import { TokenService } from '@app/core/services/token.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  constructor(private taskService: TaskService, private tokenService: TokenService) { }

  ngOnInit() {
    const userId = this.tokenService.getUser().id;
    if (userId) {
      this.getTasks(userId);
    }
  }

  getTasks(userId: string) {
    this.taskService.getTasksByUser(userId).subscribe((response) => {
      console.log(response);
    });
  }
}
