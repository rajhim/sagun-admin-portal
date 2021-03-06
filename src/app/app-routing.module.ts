import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BaseLayoutComponent} from './shared/Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './shared/Layout/pages-layout/pages-layout.component';
import {AuthGuard} from './@core/guard/auth.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'dashboard'
    },
    {
        path: '',
        component: BaseLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'user',
                data: {extraParameter: 'user'},
                loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)

            }, {
                path: 'role',
                data: {extraParameter: 'role'},
                loadChildren: () => import('./pages/role/role.module').then(m => m.RoleModule)
            }, {
                path: 'product',
                data: {extraParameter: 'product'},
                loadChildren: () => import('./pages/products/product.module').then(m => m.ProductModule)
            },
            {
                path: 'lot',
                data: {extraParameter: 'lot'},
                loadChildren: () => import('./pages/lots/lot.module').then(m => m.LotModule)

            },
            {
                path: 'lotHistory',
                data: {extraParameter: 'lotHistory'},
                loadChildren: () => import('./pages/lotHistory/lot-history.module').then(m => m.LotHistoryModule)

            },
            {
                path: 'dashboard',
                data: {extraParameter: 'dashboard'},
                loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)

            },
            {
                path: 'sales',
                data: {extraParameter: 'sales'},
                loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesModule)

            },
            {
                path: 'expenses',
                data: {extraParameter: 'expenses'},
                loadChildren: () => import('./pages/expenses/expenses.module').then(m => m.ExpensesModule)
            },
            {
                path: 'purchase',
                data: {extraParameter: 'purchase'},
                loadChildren: () => import('./pages/purchase/purchase.module').then(m => m.PurchaseModule)
            },
            {
                path: 'income',
                data: {extraParameter: 'income'},
                loadChildren: () => import('./pages/income/income.module').then(m => m.IncomeModule)
            },
            {
                path: 'transaction',
                data: {extraParameter: 'transaction'},
                loadChildren: () => import('./pages/transaction/transaction.module').then(m => m.TransactionModule)
            },
            {
                path: 'vendor',
                data: {extraParameter: 'vendor'},
                loadChildren: () => import('./pages/vendor/vendor.module').then(m => m.VendorModule)
            },
            {
                path: 'accessDenied',
                data: {extraParameter: 'accessDenied'},
                loadChildren: () => import('./pages/accessDenied/access-denied.module').then(m => m.AccessDeniedModule)
            },
        ]
    },
    {
        path: '',
        component: PagesLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

            },
        ]
    },
    {path: '**', redirectTo: '/dashboard'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            relativeLinkResolution: 'legacy'
        })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
