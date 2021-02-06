import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autocompletar2Component } from './autocompletar2.component';

describe('Autocompletar2Component', () => {
  let component: Autocompletar2Component;
  let fixture: ComponentFixture<Autocompletar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Autocompletar2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Autocompletar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
