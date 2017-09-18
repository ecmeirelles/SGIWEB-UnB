import { NgModule } from '@angular/core';

import {
  MdButtonModule,
  MdInputModule,
  MdIconModule,
  MdCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdCardModule
  ],
  exports: [
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdCardModule
  ]
})
export class MaterialModule {}
