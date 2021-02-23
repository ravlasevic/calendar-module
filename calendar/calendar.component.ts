import { Component } from '@angular/core';

export interface Day {
  date: Date,
  hidden?: boolean,
  events: Array<Event>
}

export interface Week {
  days: Day[]
}

export interface Event {
  id?:number,
  color: string,
  description: string,
  startToday: boolean,
  endToday: boolean,
  position: number
}

export interface MultidayEvent {
  id?: number,
  fromDate: string,
  toDate: string,
  description: string,
  dateArray?: Array<Date>
}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  days: Day[] = []
  weeks: Week[] = []
  displayScrum = true
  current = new Date()

// multiple day events
  multidayEvents: MultidayEvent[] = [
    {
      fromDate: '2021-02-20',
      toDate: '2021-02-24',
      description: 'Long Event'
    },
    {
      fromDate: '2021-02-22',
      toDate: '2021-02-25',
      description: 'Short Event'
    },
    {
      fromDate: '2021-02-18',
      toDate: '2021-02-24',
      description: 'Long Event 2'
    },
    {
      fromDate: '2021-02-21',
      toDate: '2021-02-22',
      description: 'Short Event 3'
    },
  ]

  ngOnInit() {
    this.multidayEventsTransform()
    this.generateDays(0)
  }

  generateDays(moveMonth:number):void {
    this.weeks = []
    this.days = []
    let firstMonday = 0
    let firstFriday = 0

    // move month
    if (moveMonth !== 0) {
      this.current.setDate(1)
      this.current.setMonth(this.current.getMonth() + moveMonth)
      this.current = new Date(this.current)
    }
    
    // get this month days
    let thisMonthDays = new Date(this.current.getFullYear(), this.current.getMonth() +1, 0).getDate()

    // find first Monday & first Friday
    if (this.displayScrum) {
      for (let day = 1; day <= thisMonthDays; day ++ ) {
        let weekDay = new Date(this.current.getFullYear(), this.current.getMonth(), day).getDay()
        if (weekDay === 1) {
          firstMonday = day 
          firstFriday = day - 3
          if (firstFriday < 1) {
            firstFriday = 12 + day - 1
          }
          if (firstFriday === 14) firstFriday = 0;
          if (firstMonday === 14) firstMonday = 0;
          break;
        }
      }
      console.log(firstMonday, firstFriday)
    } 

    // form days
    for (let day = 1; day <= thisMonthDays; day ++ ) {
      let events: Event[] = []

      // add SCRUM events
      if (this.displayScrum) {
        let weekDay = new Date(this.current.getFullYear(), this.current.getMonth(), day).getDay()

        if (weekDay !== 6 && weekDay !== 0) {
          events.push({
            color: '#7DAE7A',
            description: 'Stand-up meeting',
            startToday: true,
            endToday: true,
            position: 0
          })
        }

        if (day % 14 === firstMonday) {
          events.push({
            color: '#F2BD2C',
            description: 'Planning meeting',
            startToday: true,
            endToday: true,
            position: 0
          })
        }

        if (day % 14 === firstFriday) {
          events.push({
            color: '#E5511F',
            description: 'Demo meeting',
            startToday: true,
            endToday: true,
            position: 0
          })
        }
      }

      // add multiday events 
      let prevDayPositions = this.days[this.days.length -1] ? 
        this.days[this.days.length -1].events.reduce((prevEv, currEv) => {
          if (currEv.id) {
            prevEv.push({
              id: currEv.id,
              position: currEv.position
            })
          }
          return prevEv
        }, [] as any[]) : []

      this.multidayEvents.forEach(multiEvent => {
        let position = 1
        let dateIndex = multiEvent.dateArray ? multiEvent.dateArray.findIndex(med => {
          return med.getFullYear() === this.current.getFullYear() &&
            med.getMonth() === this.current.getMonth() &&
            med.getDate() === day
        }) : -1
        if (dateIndex > -1) {
          let prevDayEventPos = prevDayPositions.find(pos => {
              return pos.id === multiEvent.id
            })
          
          if (prevDayEventPos) position = prevDayEventPos.position
          else {
            while (prevDayPositions.some(pdp => {
              return pdp.position === position
            })) position ++
            prevDayPositions.push({
              id: 0,
              position: position
            })
          }

          events.push({
            id: multiEvent.id,
            color: '#C7BBED',
            description: multiEvent.description,
            startToday: dateIndex === 0,
            endToday: multiEvent.dateArray ? dateIndex === multiEvent.dateArray.length -1 : false,
            position: position
          })
        }
      })

      this.days.push({
        date: new Date(this.current.getFullYear(), this.current.getMonth(), day),
        events: events
      })
    }

    let firstDay = new Date(this.current.getFullYear(), this.current.getMonth(), 1).getDay()
    if (firstDay > 0) {
      while (firstDay > 0) {
        this.days.unshift({
          date: new Date(),
          hidden: true,
          events: []
        })
        firstDay --
      }
    }

    this.weeks = []
    for (let d = 0; d < this.days.length; d ++) {
      if (this.weeks[this.weeks.length -1] && 
        this.weeks[this.weeks.length -1].days.length < 7) 
        this.weeks[this.weeks.length -1].days.push(this.days[d])
      else this.weeks.push({
        days: [this.days[d]]
      })
    }
  }

  multidayEventsTransform():void {
    this.multidayEvents.forEach((multiEvent, idx) => {
      let currentDate = new Date(multiEvent.fromDate)
      let stopDate = new Date(multiEvent.toDate)
      multiEvent.dateArray = []
      for(let dt = currentDate; dt <= stopDate; dt.setDate(dt.getDate()+1)){
        multiEvent.dateArray.push(new Date(dt));
      }
      multiEvent.id = idx
    })
  }
}
