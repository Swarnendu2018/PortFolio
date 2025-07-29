import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  data:any = [];
  constructor(private dataService:ApiServiceService){}

  ngOnInit(): void {
    this.dataService.getData().subscribe((res:any) => {
      this.data = res;
    })
  }

}
