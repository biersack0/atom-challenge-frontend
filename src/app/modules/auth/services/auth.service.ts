import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { IAuthResponse, IAuthService } from "../contracts/auth.contract";
import { AuthRepository } from "../repositories/auth.repository";
import { ApiResponse } from "@app/core/models/api-response.model";
import { TokenService } from "@app/core/services/token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthService {
    constructor(
        private authRepository: AuthRepository,
        private tokenService: TokenService
    ) { }

    login(email: string): Observable<ApiResponse<IAuthResponse>> {
        return this.authRepository.login(email).pipe(
            tap(response => {
                if (response.status === "success" && response.data) {
                    this.tokenService.setToken(response.data.token);
                    this.tokenService.setUser(response.data.user);
                }
            })
        );
    }

    register(email: string): Observable<ApiResponse<IAuthResponse>> {
        return this.authRepository.register(email).pipe(
            tap(response => {
                if (response.status === "success" && response.data) {
                    this.tokenService.setToken(response.data.token);
                    this.tokenService.setUser(response.data.user);
                }
            })
        );
    }

    logout(): void {
        this.tokenService.clearAuth();
    }

    isAuthenticated(): boolean {
        return this.tokenService.isAuthenticated();
    }
}