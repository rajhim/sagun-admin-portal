import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../@core/guard/auth.guard';
import {PaidTransactionComponent} from './paid-transaction/paid-transaction.component';

const routes: Routes = [
    {
        path: 'paidTransaction', component: PaidTransactionComponent, data: {extraParameter: 'paid transaction', title: 'paid transaction'},
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule {
}
