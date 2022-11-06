import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDatoPageRoutingModule } from './update-dato-routing.module';

import { UpdateDatoPage } from './update-dato.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateDatoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateDatoPage]
})
export class UpdateDatoPageModule {}
