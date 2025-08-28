import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TaskService } from './services/task.service';
import { TokenService } from '@app/core/services/token.service';
import { ITask } from './contracts/task.contract';
import { ModalTaskComponent } from './components/modal-task/modal-task.component';
import { CommonModule, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { CardTaskComponent } from './components/card-task/card-task.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ModalTaskComponent, NgIf, NgFor, ReactiveFormsModule, CardTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: ITask[] = [];
  tasksFiltered: ITask[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';

  bsModalRef?: BsModalRef;
  @ViewChild('modalTaskTemplate', { static: true }) private modalTaskTemplate!: TemplateRef<any>;

  taskSelected: ITask | null = null;

  subscriptionTasks!: Subscription;

  constructor(
    private taskService: TaskService,
    private tokenService: TokenService,
    private modalService: BsModalService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const user = this.tokenService.getUser();
    if (user?.id) {
      this.getTasks(user.id);

      this.subscriptionTasks = this.taskService.refresh$.subscribe(() => {
        this.getTasks(user.id!);
      });
    }
  }

  ngOnDestroy() {
    this.subscriptionTasks.unsubscribe();
  }

  getTasks(userId: string) {
    this.taskService.getTasksByUser(userId).subscribe((response) => {
      this.tasks = response.data;
      this.tasksFiltered = [...this.tasks];
    });
  }

  deleteTask(id: string) {
    this.taskService.delete(id).subscribe((response) => {

    });
  }

  openModal() {
    this.bsModalRef = this.modalService.show(ModalTaskComponent, {
      initialState: {
        typeModal: 'create',
        task: this.taskSelected,
      },
      class: 'modal-md modal-dialog-centered',
      ignoreBackdropClick: true,
      backdrop: 'static'
    });
  }

  filterTasks(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
    if (filter === 'all') {
      this.tasksFiltered = [...this.tasks];
    } else {
      this.tasksFiltered = [...this.tasks].filter(task => task.isCompleted === (filter === 'completed'));
    }
  }

  logout() {
    this.tokenService.clearAuth();
    this.router.navigate(['/']);
  }
}
