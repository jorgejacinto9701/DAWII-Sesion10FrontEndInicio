import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDocenteComponent } from './crud-docente.component';

describe('CrudDocenteComponent', () => {
  let component: CrudDocenteComponent;
  let fixture: ComponentFixture<CrudDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
