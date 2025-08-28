import { Injectable } from '@angular/core';
import { ITask, ITaskRepository, ITaskService } from '../contracts/task.contract';
import { Observable } from 'rxjs';
import { ApiResponse } from '@app/core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements ITaskService {
  constructor(private taskRepository: ITaskRepository) { }
  getTasksByUser(userId: string): Observable<ApiResponse<ITask[]>> {
    return this.taskRepository.getTasksByUser(userId);
  }
  findById(id: string): Observable<ApiResponse<ITask>> {
    return this.taskRepository.findById(id);
  }
  create(task: ITask): Observable<ApiResponse<ITask>> {
    return this.taskRepository.create(task);
  }
  update(task: ITask): Observable<ApiResponse<ITask>> {
    return this.taskRepository.update(task);
  }
  delete(id: string): Observable<ApiResponse<void>> {
    return this.taskRepository.delete(id);
  }
}
