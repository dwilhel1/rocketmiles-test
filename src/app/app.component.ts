import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HotelService } from './services/hotel/hotel.service';

import { Hotel, HotelResponse } from './models/hotel/response/hotel.model';
import { CurrencyEnum } from './enum/currency.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public currencyEnum = CurrencyEnum;
  public hotelResponse: HotelResponse;
  public tableData: MatTableDataSource<Hotel>;
  public hotelSearchFormGroup: FormGroup;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private hotelService: HotelService, private _snackBar: MatSnackBar) {}

  public ngOnInit(): void {
    // Initialize formGroup instance
    this.hotelSearchFormGroup = new FormGroup({
      hotelSearch: new FormControl(''),
      currency: new FormControl(''),
    });

    this.getHotels();
    this.onChanges();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public resetSearch(): void {
    this.hotelSearchFormGroup.reset();
    if (this.hotelResponse) {
      this.hotelSearchFormGroup.enable();
    } else {
      this.hotelSearchFormGroup.disable();
    }
    this.configureTableData();
  }

  public onChanges(): void {
    this.hotelSearchFormGroup.controls.currency.valueChanges.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(currencyChanges => {
      if (currencyChanges) {
        this.sortData(currencyChanges);
      }
    });

    this.hotelSearchFormGroup.controls.hotelSearch.valueChanges.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(searchChanges => {
      this.filterData(searchChanges);
    });
  }

  public getHotels(): void {
    // Request list of hotels, subscribe to formGroup on success
    this.hotelService.getHotels().pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((response: HotelResponse) => {
      this.hotelResponse = response;
      this.configureTableData();
      this.resetSearch();
    }, () => {
      this.resetSearch();

      this._snackBar.open('Error requesting hotels', 'Retry').onAction().pipe(
        takeUntil(this.unsubscribe),
      ).subscribe(() => {
        this.getHotels();
      });
    });
  }

  private configureTableData(): void {
    if (this.hotelResponse && this.hotelResponse.results.hotels) {
      this.tableData = new MatTableDataSource(Array.from(this.hotelResponse.results.hotels));
    }
  }

  private sortData(key: CurrencyEnum): void {
    switch (key) {
      case CurrencyEnum.DESC:
      case CurrencyEnum.ASC:
        // Sort according to lowestAveragePrice.amount
        this.tableData.data = this.tableData.data.sort((a, b) => {
          const nameA = a.lowestAveragePrice.amount;
          const nameB = b.lowestAveragePrice.amount;

          if (nameA < nameB) {
            if (key === CurrencyEnum.ASC) {
              return 1
            } else {
              return -1;
            }
          }
          if (nameA > nameB) {
            if (key === CurrencyEnum.ASC) {
              return -1
            } else {
              return 1;
            }
          }
        });
        break;
      case CurrencyEnum.RECOMMENDED:
        // TODO: Determine how recommended list is to be structured; control is disabled for now
        break;
      default:
        break;
    }
  }

  private filterData(search: string): void {
    if (search) {
      this.tableData.data = this.hotelResponse.results.hotels.filter(hotel => {
        const hotelName = hotel.hotelStaticContent.name.trim().toLowerCase();
        const hotelNameSearch = search.trim().toLowerCase();

        return ~hotelName.indexOf(hotelNameSearch)
      });
      if (this.hotelSearchFormGroup.controls.currency.value) {
        this.sortData(this.hotelSearchFormGroup.controls.currency.value);
      }
    } else {
      this.configureTableData();
    }
  }
}
