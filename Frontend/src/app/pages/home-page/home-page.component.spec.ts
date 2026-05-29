import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { HomePageComponent } from './home-page.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { environment } from 'src/environments/environment';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let apiService: jasmine.SpyObj<ApiServiceService>;

  const mockProfile = [
    {
      name: 'Swarnendu Gharami',
      designation: 'Software Engineer',
      email: 'test@example.com',
      phone: '1234567890',
      experiences: [],
      education: []
    }
  ];

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiServiceService>('ApiServiceService', ['getData']);
    apiService.getData.and.returnValue(of(mockProfile));

    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        { provide: ApiServiceService, useValue: apiService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should load profile data on init', () => {
    fixture.detectChanges();

    expect(apiService.getData).toHaveBeenCalled();
    expect(component.data).toEqual(mockProfile);
    expect(component.isLoading).toBeFalse();
  });

  it('should stop loading when profile data fails to load', () => {
    apiService.getData.and.returnValue(throwError(() => new Error('API failed')));

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.data).toEqual([]);
  });

  it('should create a download link for the CV', () => {
    const anchor = document.createElement('a');
    spyOn(document, 'createElement').and.returnValue(anchor);
    const clickSpy = spyOn(anchor, 'click');

    component.downloadCV();

    expect(anchor.href).toBe(`${environment.apiUrl}/download-cv`);
    expect(anchor.download).toBe('Swarnendu_Gharami_MEAN_Stack.pdf');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should scroll to the contact section', () => {
    const scrollIntoView = jasmine.createSpy('scrollIntoView');
    component.contactSection = new ElementRef({ scrollIntoView });

    component.scrollToContact();

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
