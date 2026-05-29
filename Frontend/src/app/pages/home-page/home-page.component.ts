import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  @ViewChild('contactSection') contactSection!: ElementRef;

  data:any = [];
  isLoading = true;
  private dataSubscription?: Subscription;

  constructor(private dataService:ApiServiceService){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    this.dataSubscription = this.dataService.getData().subscribe({
      next: (res) => {
        this.data = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = `${environment.apiUrl}/download-cv`; // or your API endpoint
    link.download = 'Swarnendu_Gharami_MEAN_Stack.pdf';
    link.click();
  }

  scrollToContact(){
    this.contactSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }
}
