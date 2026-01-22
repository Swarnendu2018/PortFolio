import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocailLinkComponent } from './socail-link.component';

describe('SocailLinkComponent', () => {
  let component: SocailLinkComponent;
  let fixture: ComponentFixture<SocailLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocailLinkComponent]
    });
    fixture = TestBed.createComponent(SocailLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
