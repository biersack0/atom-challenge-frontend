import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TaskService } from './services/task.service';
import { TokenService } from '@app/core/services/token.service';
import { ITask } from './contracts/task.contract';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardTaskComponent } from './components/card-task/card-task.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ModalComponent, NgIf, NgFor, ReactiveFormsModule, CardTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: ITask[] = [];
  tasksFiltered: ITask[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';

  bsModalRef?: BsModalRef;
  @ViewChild('modalTaskTemplate', { static: true }) private modalTaskTemplate!: TemplateRef<any>;

  taskSelected: ITask | null = null;

  constructor(
    private taskService: TaskService,
    private tokenService: TokenService,
    private modalService: BsModalService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const userId = this.tokenService.getUser()?.id;
    if (userId) {
      this.getTasks(userId);
    }
  }

  getTasks(userId: string) {
    this.taskService.getTasksByUser(userId).subscribe((response) => {
      this.tasks = response.data;
      this.tasksFiltered = [...this.tasks];
      console.log('📋 Tareas obtenidas:', response);
    });
  }



  deleteTask(id: string) {
    this.taskService.delete(id).subscribe((response) => {
      console.log('📋 Tarea eliminada:', response);
    });
  }

  openModal() {
    this.bsModalRef = this.modalService.show(ModalComponent, {
      initialState: {
        typeModal: 'create',
        task: this.taskSelected,
      }
    });
  }

  confirmButtonModal() {
    console.log('confirmButtonModal');
  }

  closeButtonModal() {
    console.log('closeButtonModal');
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
