import { Injectable } from '@angular/core';
import { ITask, ITaskService } from '../contracts/task.contract';
import { TaskRepository } from '../repositories/task.repository';
import { Observable, Subject, tap } from 'rxjs';
import { ApiResponse } from '@app/core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements ITaskService {
  private _refresh$ = new Subject<void>();

  get refresh$() {
    return this._refresh$;
  }

  constructor(private taskRepository: TaskRepository) { }
  getTasksByUser(userId: string): Observable<ApiResponse<ITask[]>> {
    return this.taskRepository.getTasksByUser(userId);
  }
  findById(id: string): Observable<ApiResponse<ITask>> {
    return this.taskRepository.findById(id);
  }
  create(task: ITask): Observable<ApiResponse<ITask>> {
    return this.taskRepository.create(task).pipe(tap(() => this._refresh$.next()));
  }
  update(task: ITask): Observable<ApiResponse<ITask>> {
    return this.taskRepository.update(task).pipe(tap(() => this._refresh$.next()));
  }
  delete(id: string): Observable<ApiResponse<void>> {
    return this.taskRepository.delete(id).pipe(tap(() => this._refresh$.next()));
  }
}
