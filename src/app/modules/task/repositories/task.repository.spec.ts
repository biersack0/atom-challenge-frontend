import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TaskRepository } from "./task.repository";
import { environment } from "@environments/environment";
import { ITask } from "../contracts/task.contract";
import { ApiResponse } from "@app/core/models/api-response.model";

describe("TaskRepository", () => {
    let repository: TaskRepository;
    let httpMock: HttpTestingController;

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

    it("debería obtener las tareas de un usuario", () => {
        const mockTasks: ITask[] = [{ id: "1", title: "Tarea 1" } as ITask];
        const mockResponse: ApiResponse<ITask[]> = {
            data: mockTasks,
            message: "Tareas obtenidas exitosamente",
            status: "success"
        };

        repository.getTasksByUser("123").subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${environment.api}/task/123`);
        expect(req.request.method).toBe("GET");
        req.flush(mockResponse);
    });

    it("debería crear una tarea", () => {
        const mockTask: ITask = { id: "1", title: "Nueva tarea" } as ITask;
        const mockResponse: ApiResponse<ITask> = {
            data: mockTask,
            message: "Tarea creada exitosamente",
            status: "success"
        };

        repository.create(mockTask).subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${environment.api}/task`);
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual(mockTask);
        req.flush(mockResponse);
    });

    it("debería actualizar una tarea", () => {
        const mockTask: ITask = { id: "1", title: "Tarea actualizada" } as ITask;
        const mockResponse: ApiResponse<ITask> = {
            data: mockTask,
            message: "Tarea actualizada exitosamente",
            status: "success"
        };

        repository.update(mockTask).subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${environment.api}/task`);
        expect(req.request.method).toBe("PUT");
        expect(req.request.body).toEqual(mockTask);
        req.flush(mockResponse);
    });

    it("debería eliminar una tarea", () => {
        const mockResponse: ApiResponse<void> = {
            data: undefined,
            message: "Tarea eliminada exitosamente",
            status: "success"
        };

        repository.delete("1").subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${environment.api}/task/1`);
        expect(req.request.method).toBe("DELETE");
        req.flush(mockResponse);
    });
});
