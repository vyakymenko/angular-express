import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [NavbarComponent, ToolbarComponent],
  exports: [
    // @angular
    CommonModule,
    FormsModule,
    RouterModule,
    // @components
    NavbarComponent,
    ToolbarComponent
  ]
})
export class SharedModule { }
