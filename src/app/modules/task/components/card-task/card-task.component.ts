import { Component, Input } from '@angular/core';
import { ITask } from '../../contracts/task.contract';
import { NgClass } from '@angular/common';
import moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import Swal from 'sweetalert2';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-task.component.html',
})
export class CardTaskComponent {
  @Input({ required: true }) task!: ITask;

  constructor(private modalService: BsModalService, private taskService: TaskService) {

  }

  toDate(timestamp: any): string {
    const milliseconds = timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1_000_000);
    const date = moment(milliseconds);
    return date.format('DD/MM/YYYY HH:mm');
  }

  deleteTask(taskId: string) {
    this.taskService.delete(taskId).subscribe((response) => {
      console.log('📋 Tarea eliminada:', response);
    });
  }

  openModal(task: ITask, typeModal: 'edit' | 'delete') {
    this.modalService.show(ModalComponent, {
      initialState: {
        typeModal: typeModal,
        task: this.task,
      }
    });
  }

  confirmDeleteAlert(taskId: string) {
    Swal.fire({
      title: '¿Desea eliminar la tarea?',
      text: 'Esta acción no se puede deshacer',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTask(taskId);
      }
    })
  }
}
