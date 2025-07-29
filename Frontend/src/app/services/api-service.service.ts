import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = 'http://localhost:3000/api/profile';

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.url);
  }
}
