import { Component, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgClass } from '@angular/common';
import moment from 'moment';
import { ITask } from '../../contracts/task.contract';
import { ModalTaskComponent } from '../modal-task/modal-task.component';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-task.component.html',
})
export class CardTaskComponent {
  @Input({ required: true }) task!: ITask;

  constructor(private modalService: BsModalService) { }

  toDate(timestamp: any): string {
    const milliseconds = timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1_000_000);
    const date = moment(milliseconds);
    return date.format('DD/MM/YYYY');
  }

  openModal(task: ITask, typeModal: 'edit' | 'delete') {
    this.modalService.show(ModalTaskComponent, {
      initialState: {
        typeModal: typeModal,
        task: task,
      },
      class: 'modal-md modal-dialog-centered',
      ignoreBackdropClick: true,
      backdrop: 'static'
    });
  }
}
