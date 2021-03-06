import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {ProductNewComponent} from './product-new/product-new.component';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';


@NgModule({
    declarations: [
        ProductNewComponent,
        ProductListComponent,
        ProductCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ProductsRoutingModule
    ]
})
export class ProductModule {

}
