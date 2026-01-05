import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = 'https://portfolio-3hde.onrender.com/api/profile';

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.url);
  }
}
