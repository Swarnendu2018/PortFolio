import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScelitonComponent } from './sceliton.component';

describe('ScelitonComponent', () => {
  let component: ScelitonComponent;
  let fixture: ComponentFixture<ScelitonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScelitonComponent]
    });
    fixture = TestBed.createComponent(ScelitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
