import { TaskRepository } from './task.repository';
import { ITask } from '../contracts/task.contract';
import { ApiResponse } from '@app/core/models/api-response.model';
import { of } from 'rxjs';
import { environment } from '@environments/environment';

describe('TaskRepository', () => {
    let repository: TaskRepository;
    let httpClient: any;
    const mockApiUrl = environment.api;

    beforeEach(() => {
        httpClient = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        };

        repository = new TaskRepository(httpClient);
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

        httpClient.get.mockReturnValue(of(mockResponse));

        repository.getTasksByUser(userId).subscribe((res) => {
            expect(res).toEqual(mockResponse);
            expect(res.data.length).toBe(2);
        });

        expect(httpClient.get).toHaveBeenCalledWith(`${mockApiUrl}/task/${userId}`);
    });

    it('debería crear una nueva tarea', () => {
        const newTask: ITask = { id: '3', title: 'Nueva Tarea', userId: '123', description: '', isCompleted: false };
        const mockResponse: ApiResponse<ITask> = {
            status: 'success',
            message: 'Tarea creada exitosamente',
            data: newTask,
        };

        httpClient.post.mockReturnValue(of(mockResponse));

        repository.create(newTask).subscribe((res) => {
            expect(res).toEqual(mockResponse);
            expect(res.data.title).toBe('Nueva Tarea');
        });

        expect(httpClient.post).toHaveBeenCalledWith(`${mockApiUrl}/task`, newTask);
    });

    it('debería actualizar una tarea', () => {
        const updatedTask: ITask = { id: '1', title: 'Tarea Actualizada', userId: '123', description: '', isCompleted: false };
        const mockResponse: ApiResponse<ITask> = {
            status: 'success',
            message: 'Tarea actualizada exitosamente',
            data: updatedTask,
        };

        httpClient.put.mockReturnValue(of(mockResponse));

        repository.update(updatedTask).subscribe((res) => {
            expect(res).toEqual(mockResponse);
            expect(res.data.title).toBe('Tarea Actualizada');
        });

        expect(httpClient.put).toHaveBeenCalledWith(`${mockApiUrl}/task`, updatedTask);
    });

    it('debería eliminar una tarea', () => {
        const taskId = '1';
        const mockResponse: ApiResponse<void> = {
            status: 'success',
            message: 'Tarea eliminada exitosamente',
            data: undefined,
        };

        httpClient.delete.mockReturnValue(of(mockResponse));

        repository.delete(taskId).subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        expect(httpClient.delete).toHaveBeenCalledWith(`${mockApiUrl}/task/${taskId}`);
    });
});
