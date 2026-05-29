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

  it('should expose GitHub, LinkedIn, and email social links', () => {
    expect(component.socialLinks).toEqual([
      jasmine.objectContaining({
        url: 'https://github.com/Swarnendu2018',
        icon: 'bi-github',
        colorClass: 'text-dark'
      }),
      jasmine.objectContaining({
        url: 'https://www.linkedin.com/in/swarnendu-gharami-547554139/',
        icon: 'bi-linkedin',
        colorClass: 'text-primary'
      }),
      jasmine.objectContaining({
        url: 'https://mail.google.com/mail/?view=cm&to=swarnenduriku2014@gmail.com',
        icon: 'bi-google',
        colorClass: 'text-dark'
      })
    ]);
  });
});
