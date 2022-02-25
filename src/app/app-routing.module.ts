import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './shared/Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './shared/Layout/pages-layout/pages-layout.component';
import {AuthGuard} from './@core/guard/auth.guard';


const routes: Routes = [
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
                path: 'sales',
                data: {extraParameter: 'sales'},
                loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesModule)

            }
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

    {path: '**', redirectTo: '/user/list'}
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
