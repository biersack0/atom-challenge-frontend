import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { TokenService } from '@app/core/services/token.service';
import { ITask } from './contracts/task.contract';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    const userId = this.tokenService.getUser()?.id;
    if (userId) {
      this.getTasks(userId);
    }
  }

  getTasks(userId: string) {
    this.taskService.getTasksByUser(userId).subscribe((response) => {
      console.log('📋 Tareas obtenidas:', response);
    });
  }

  createTask(task: ITask) {
    this.taskService.create(task).subscribe((response) => {
      console.log('📋 Tarea creada:', response);
    });
  }

  updateTask(task: ITask) {
    this.taskService.update(task).subscribe((response) => {
      console.log('📋 Tarea actualizada:', response);
    });
  }

  deleteTask(id: string) {
    this.taskService.delete(id).subscribe((response) => {
      console.log('📋 Tarea eliminada:', response);
    });
  }

  openModal() {
    Swal.fire({
      title: 'Agregar tarea',
      text: 'Ingrese el nombre de la tarea',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',

    }).then((result) => {

    }).finally(() => {

    });
  }
}
