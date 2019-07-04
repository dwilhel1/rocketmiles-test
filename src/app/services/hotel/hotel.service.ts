import { Injectable}  from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HotelResponse } from '../../models/hotel/response/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor(private http: HttpClient) {}

  public getHotels(): Observable<HotelResponse> {
    const url = 'https://homework-app.rocketmiles.com/fe-homework/rates';

    return this.http.get(url).pipe(
      map(data => new HotelResponse(data)),
      catchError(null),
    );
  }
}
