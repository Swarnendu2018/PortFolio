import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  @ViewChild('contactSection') contactSection!: ElementRef;

  data:any = [];
  constructor(private dataService:ApiServiceService){}

  ngOnInit(): void {
    this.dataService.getData().subscribe((res:any) => {
      this.data = res;
    })
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'https://portfolio-3hde.onrender.com/download-cv'; // or your API endpoint
    link.download = 'Swarnendu_Gharami_MEAN_Stack.pdf';
    link.click();
  }

  scrollToContact(){
    this.contactSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.data.unsubscribe();
  }
}
