import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { ITask, ITaskRepository } from "../contracts/task.contract";
import { ApiResponse } from "@app/core/models/api-response.model";

@Injectable({
    providedIn: 'root'
})
export class TaskRepository implements ITaskRepository {
    private url = environment.api;

    constructor(private http: HttpClient) { }
    getTasksByUser(userId: string): Observable<ApiResponse<ITask[]>> {
        return this.http.get<ApiResponse<ITask[]>>(`${this.url}/task/${userId}`);
    }
    findById(id: string): Observable<ApiResponse<ITask>> {
        return this.http.get<ApiResponse<ITask>>(`${this.url}/task/${id}`);
    }
    create(task: ITask): Observable<ApiResponse<ITask>> {
        return this.http.post<ApiResponse<ITask>>(`${this.url}/task`, task);
    }
    update(task: ITask): Observable<ApiResponse<ITask>> {
        return this.http.put<ApiResponse<ITask>>(`${this.url}/task`, task);
    }
    delete(id: string): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.url}/task/${id}`);
    }

}