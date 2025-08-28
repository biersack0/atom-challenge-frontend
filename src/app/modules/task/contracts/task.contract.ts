import { ApiResponse } from "@app/core/models/api-response.model";
import { Observable } from "rxjs";

export interface ITask {
    id?: string;
    userId: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITaskService {
    getTasksByUser(userId: string): Observable<ApiResponse<ITask[]>>;
    findById(id: string): Observable<ApiResponse<ITask>>;
    create(task: ITask): Observable<ApiResponse<ITask>>;
    update(task: ITask): Observable<ApiResponse<ITask>>;
    delete(id: string): Observable<ApiResponse<void>>;
}

export interface ITaskRepository {
    getTasksByUser(userId: string): Observable<ApiResponse<ITask[]>>;
    findById(id: string): Observable<ApiResponse<ITask>>;
    create(task: ITask): Observable<ApiResponse<ITask>>;
    update(task: ITask): Observable<ApiResponse<ITask>>;
    delete(id: string): Observable<ApiResponse<void>>;
}