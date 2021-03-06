import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {GenericService} from '../../../@core/service/generic.service';
import {UserModel} from '../model/user-model';
import {configApiUrl} from '../../../app-config';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ChangePasswordModel} from '../model/change-password-model';


@Injectable({
    providedIn: 'root'
})
export class UserService extends GenericService<UserModel> {

    constructor(http: HttpClient, protected router: Router) {
        super(http, configApiUrl.USER_API, router);
    }

    public getUserProfile(): Observable<UserModel> {
        return this.http.get(this.baseUrl + '/profile', { observe: 'response'}).pipe(
            map((res: any) => {
                this.setUpdatedHeader(res);
                return res.body;
            }),
            catchError((error) => this.handleError(error))
        );
    }

    public updateUserProfile(data: UserModel): Observable<UserModel> {
        return this.http.put(this.baseUrl, data, { observe: 'response'}).pipe(
            map((res: any) => {
                this.setUpdatedHeader(res);
                return res.body;
            }),
            catchError((error) => this.handleError(error))
        );
    }

    public updatePassword(data: ChangePasswordModel): Observable<UserModel> {
        return this.http.put(this.baseUrl + '/updatePassword', data, { observe: 'response'}).pipe(
            map((res: any) => {
                this.setUpdatedHeader(res);
                return res.body;
            }),
            catchError((error) => this.handleError(error))
        );
    }


}
