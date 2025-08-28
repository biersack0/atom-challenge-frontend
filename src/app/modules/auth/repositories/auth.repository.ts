import { Injectable } from "@angular/core";
import { IAuthRepository, IAuthResponse } from "../contracts/auth.contract";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { ApiResponse } from "@app/core/models/api-response.model";

@Injectable({
    providedIn: 'root'
})
export class AuthRepository implements IAuthRepository {
    private url = environment.api;
    constructor(private http: HttpClient) { }
    login(email: string): Observable<ApiResponse<IAuthResponse>> {
        return this.http.post<ApiResponse<IAuthResponse>>(`${this.url}/auth/login`, { email });
    }
    register(email: string): Observable<ApiResponse<IAuthResponse>> {
        return this.http.post<ApiResponse<IAuthResponse>>(`${this.url}/auth/register`, { email });
    }
}   