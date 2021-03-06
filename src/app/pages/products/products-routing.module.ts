import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductNewComponent} from './product-new/product-new.component';
import {AuthGuard} from '../../@core/guard/auth.guard';


const routes: Routes = [
    {
        path: 'new', component: ProductNewComponent, data: {extraParameter: 'Product New', title: 'Product New'},
        canActivate: [AuthGuard]
    },
    {
        path: 'list', component: ProductListComponent, data: {extraParameter: 'Product List', title: 'Product List'},
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:id', component: ProductNewComponent, data: {extraParameter: 'Product Edit', title: 'Product Edit'},
        canActivate: [AuthGuard]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {
}
