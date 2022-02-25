import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private route: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    }
}
