import { ApiResponse } from "@app/core/models/api-response.model";
import { Observable } from "rxjs";

export interface IAuth {
    email: string;
}

export interface IUser {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IAuthResponse {
    user: IUser;
    token: string;
}

export interface IAuthService {
    login(email: string): Observable<ApiResponse<IAuthResponse>>;
    register(email: string): Observable<ApiResponse<IAuthResponse>>;
}

export interface IAuthRepository {
    login(email: string): Observable<ApiResponse<IAuthResponse>>;
    register(email: string): Observable<ApiResponse<IAuthResponse>>;
}