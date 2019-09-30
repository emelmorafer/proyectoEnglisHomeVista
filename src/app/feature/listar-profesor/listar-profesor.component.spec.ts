import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProfesorComponent } from './listar-profesor.component';

describe('ListarProfesorComponent', () => {
  let component: ListarProfesorComponent;
  let fixture: ComponentFixture<ListarProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
