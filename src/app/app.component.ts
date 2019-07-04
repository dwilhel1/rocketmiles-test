import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HotelService } from './services/hotel/hotel.service';

import { HotelResponse } from './models/hotel/response/hotel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public hotelResponse: HotelResponse;
  public hotelSearchFormGroup: FormGroup;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private hotelService: HotelService) {}

  public ngOnInit(): void {
    this.hotelSearchFormGroup = new FormGroup({
      hotelSearch: new FormControl(''),
      currency: new FormControl(''),
    });
    this.hotelService.getHotels().pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((response: HotelResponse) => {
      this.hotelResponse = response;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public resetSearch(): void {
    console.log('Search has been reset');
    this.hotelSearchFormGroup.reset();
  }
}
