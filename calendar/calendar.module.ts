import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { DayComponent } from './day/day.component';


@NgModule({
  declarations: [
    CalendarComponent,
    DayComponent
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule
  ]
})

export class CalendarModule {  }
