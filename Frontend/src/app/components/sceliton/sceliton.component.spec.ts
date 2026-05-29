import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ScelitonComponent } from './sceliton.component';

describe('ScelitonComponent', () => {
  let component: ScelitonComponent;
  let fixture: ComponentFixture<ScelitonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScelitonComponent],
      imports: [NgxSkeletonLoaderModule]
    });
    fixture = TestBed.createComponent(ScelitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
