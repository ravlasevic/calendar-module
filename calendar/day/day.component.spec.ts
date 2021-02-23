import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DebugElement } from '@angular/core'

import { DayComponent } from './day.component'

describe('DayComponent', () => {
    let component: DayComponent
    let fixture: ComponentFixture<DayComponent>
    let de: DebugElement

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DayComponent ]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DayComponent)
        component = fixture.componentInstance
        de = fixture.debugElement

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})