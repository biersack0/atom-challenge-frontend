import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ApiAtomInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let request = req;
		const token = localStorage.getItem('token') || '';

		const headers = new HttpHeaders({
			Authorization: `Bearer ${token}`,
		});

		request = req.clone({
			headers,
		});

		return next.handle(request);
	}
}
