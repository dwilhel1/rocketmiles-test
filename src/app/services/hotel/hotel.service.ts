import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HotelService {
  constructor(private http: HttpClient) {}

  public getHotels(): Observable<any> {
    const url = 'https://homework-app.rocketmiles.com/fe-homework/rates';

    return this.http.get(url).pipe(
      catchError(null)
    ) as Observable<any>;
  }
}
