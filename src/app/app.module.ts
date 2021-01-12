import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HolidaysComponent } from './holidays/holidays.component';
import { HolidaysDetailComponent } from './holidays/holidays-detail/holidays-detail.component';
import { HolidaysListComponent } from './holidays/holidays-list/holidays-list.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './app-date-adapter';
import { LocationsComponent } from './locations/locations.component';
import { SharedModule } from './shared/shared.module';
import { FilterSelectComponent } from './shared/components/filter-select/filter-select.component';
import { CustomInputComponent } from './holidays/custom-input/custom-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomAutocompleteModule } from '@fourcast/components/custom-autocomplete';



@NgModule({
  declarations: [
    AppComponent,
    HolidaysComponent,
    HolidaysDetailComponent,
    HolidaysListComponent,
    AddressFormComponent,
    LocationsComponent,
    FilterSelectComponent,
    CustomInputComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    CustomAutocompleteModule







  ],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter }],
  bootstrap: [AppComponent]
})
export class AppModule { }
