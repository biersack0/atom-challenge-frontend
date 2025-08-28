import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlMessageComponent } from '@app/shared/components/control-message/control-message.component';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../contracts/task.contract';
import { TokenService } from '@app/core/services/token.service';
import { BsModalService } from 'ngx-bootstrap/modal';
export type TypeModal = 'create' | 'edit' | 'delete';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule, ControlMessageComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent<T> {
  @Input({ required: false }) task: ITask | null = null;
  @Input({ required: true }) typeModal: TypeModal = 'create';

  isLoadingRequest = false;
  taskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private taskService: TaskService, private tokenService: TokenService) {
    this.initForm();
  }

  initForm() {
    console.log('🔍 Task:', this.task);

    this.taskForm = this.formBuilder.group({
      title: [this.task?.title || '', [Validators.required]],
      description: [this.task?.description || ''],
      isCompleted: [this.task?.isCompleted || false, [Validators.required]],
    });
  }

  closeModal() {
    this.modalService.hide();
  }

  closeOrUpdate() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.valid) {
      this.isLoadingRequest = true;
      const { title, description, isCompleted } = this.taskForm.value;

      if (this.typeModal === 'create') {
        this.createTask(title, description, isCompleted);
      }

      if (this.typeModal === 'edit') {
        this.updateTask(title, description, isCompleted);
      }

      this.isLoadingRequest = false;
    }
  }

  createTask(title: string, description: string, isCompleted: boolean) {
    const task: ITask = {
      userId: this.tokenService.getUser()?.id || '',
      title,
      description,
      isCompleted,
    }

    this.taskService.create(task).subscribe((response) => {
      console.log('📋 Tarea creada:', response);
      this.closeModal();
    });
  }

  updateTask(title: string, description: string, isCompleted: boolean) {
    const task: ITask = {
      userId: this.tokenService.getUser()?.id || '',
      title,
      description,
      isCompleted,
    }

    this.taskService.update(task).subscribe((response) => {
      if (response.status === "success") {
        this.closeModal();
      }
    });
  }
}
