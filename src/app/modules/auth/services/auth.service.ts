import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAuthResponse, IAuthService } from "../contracts/auth.contract";
import { AuthRepository } from "../repositories/auth.repository";
import { ApiResponse } from "@app/core/models/api-response.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthService {
    constructor(private authRepository: AuthRepository) { }

    login(email: string): Observable<ApiResponse<IAuthResponse>> {
        return this.authRepository.login(email);
    }

    register(email: string): Observable<ApiResponse<IAuthResponse>> {
        return this.authRepository.register(email);
    }
}