import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
	providedIn: 'root',
})
export class ApiAtomInterceptor implements HttpInterceptor {
	constructor(private tokenService: TokenService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let request = req;
		const token = this.tokenService.getToken();

		console.log('int');


		const headers = new HttpHeaders({
			Authorization: `Bearer ${token}`,
		});

		request = req.clone({
			headers,
		});

		return next.handle(request);
	}
}
