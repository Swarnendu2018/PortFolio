import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = 'https://swarnenduportfoliobackend123.vercel.app/api/profile';

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.url);
  }
}
