import {Injectable} from '@angular/core';
import {GenericService} from '../../../@core/service/generic.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {configApiUrl} from '../../../app-config';
import {SalesModel} from '../model/sales-model';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SalesService extends GenericService <SalesModel> {

    constructor(http: HttpClient, protected router: Router) {
        super(http, configApiUrl.SALES_API, router);
    }

    public updateSales(id: number, data: SalesModel): Observable<SalesModel> {
        return this.http.put(this.baseUrl + '/updateSales/' + id, data, { observe: 'response'}).pipe(
            map((res: any) => {
                this.setUpdatedHeader(res);
                return res.body;
            }),
            catchError((error) => this.handleError(error))
        );
    }
}
