import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDatoPage } from './update-dato.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateDatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDatoPageRoutingModule {}
