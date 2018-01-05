import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetCreateComponent } from './asset-create/asset-create.component';
const routes: Routes = [
  {path: 'asset', component: AssetListComponent},
  {path: 'asset/create', component: AssetCreateComponent},
  {path: 'asset/edit/:id', component: AssetCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
