import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetCreateComponent } from './asset-create/asset-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AssetRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AssetListComponent, AssetCreateComponent]
})
export class AssetModule { }
