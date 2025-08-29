import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskRepository } from './task.repository';
import { ITask } from '../contracts/task.contract';
import { ApiResponse } from '@app/core/models/api-response.model';
import { environment } from '@environments/environment';

describe('TaskRepository Integration Tests', () => {
    let repository: TaskRepository;
    let httpMock: HttpTestingController;
    const apiUrl = environment.api;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TaskRepository],
        });

        repository = TestBed.inject(TaskRepository);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('debería crear el servicio', () => {
        expect(repository).toBeTruthy();
    });

    it('debería obtener las tareas de un usuario', () => {
        const userId = '123';
        const mockTasks: ITask[] = [
            { id: '1', title: 'Tarea 1', userId: '123', description: '', isCompleted: false },
            { id: '2', title: 'Tarea 2', userId: '123', description: '', isCompleted: false },
        ];
        const mockResponse: ApiResponse<ITask[]> = {
            status: 'success',
            message: 'Tareas obtenidas exitosamente',
            data: mockTasks,
        };

        repository.getTasksByUser(userId).subscribe((res) => {
            expect(res).toEqual(mockResponse);
            expect(res.data.length).toBe(2);
        });

        const req = httpMock.expectOne(`${apiUrl}/task/${userId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería crear una nueva tarea', () => {
        const newTask: ITask = { id: '3', title: 'Nueva Tarea', userId: '123', description: '', isCompleted: false };
        const mockResponse: ApiResponse<ITask> = {
            status: 'success',
            message: 'Tarea creada exitosamente',
            data: newTask,
        };

        repository.create(newTask).subscribe((res) => {
            expect(res).toEqual(mockResponse);
            expect(res.data.title).toBe('Nueva Tarea');
        });

        const req = httpMock.expectOne(`${apiUrl}/task`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newTask);
        req.flush(mockResponse);
    });

    it('debería actualizar una tarea', () => {
        const updatedTask: ITask = { id: '1', title: 'Tarea Actualizada', userId: '123', description: '', isCompleted: false };
        const mockResponse: ApiResponse<ITask> = {
            status: 'success',
            message: 'Tarea actualizada exitosamente',
            data: updatedTask,
        };

        repository.update(updatedTask).subscribe((res) => {
            expect(res).toEqual(mockResponse);
            expect(res.data.title).toBe('Tarea Actualizada');
        });

        const req = httpMock.expectOne(`${apiUrl}/task`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedTask);
        req.flush(mockResponse);
    });

    it('debería eliminar una tarea', () => {
        const taskId = '1';
        const mockResponse: ApiResponse<void> = {
            status: 'success',
            message: 'Tarea eliminada exitosamente',
            data: undefined,
        };

        repository.delete(taskId).subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${apiUrl}/task/${taskId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(mockResponse);
    });
});
