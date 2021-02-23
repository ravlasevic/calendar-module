import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

import { CalendarComponent } from './calendar.component'

describe('CalendarComponent', () => {
    let component: CalendarComponent
    let fixture: ComponentFixture<CalendarComponent>
    let de: DebugElement

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CalendarComponent ]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarComponent)
        component = fixture.componentInstance
        de = fixture.debugElement

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should have table', () => {
        expect(de.query(By.css('table')).nativeElement.innerText).toBeTruthy()
    })
})
