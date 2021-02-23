import { Component, Input } from '@angular/core';
import { Day, Event } from '../calendar.component';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['../calendar.component.css']
})

export class DayComponent {
  @Input() day: Day

  date = new Date()
  events: Event[] = []
  today: boolean

  ngOnInit() {
    this.day.events.sort((a, b) => {
      if (a.position !== 0 && b.position === 0) return -1
      if (a.position === 0 && b.position !== 0) return 1
      if (a.position < b.position) return -1
      if (a.position > b.position) return 1
      return 0
    })

    this.today = this.day.date.getFullYear() === new Date().getFullYear() &&
      this.day.date.getMonth() === new Date().getMonth() &&
      this.day.date.getDate() === new Date().getDate()
    
  }
}