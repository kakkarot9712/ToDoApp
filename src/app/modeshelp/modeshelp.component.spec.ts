import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeshelpComponent } from './modeshelp.component';

describe('ModeshelpComponent', () => {
  let component: ModeshelpComponent;
  let fixture: ComponentFixture<ModeshelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeshelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeshelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
