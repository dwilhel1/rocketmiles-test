import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDividerModule, MatTooltipModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  exports: [
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
