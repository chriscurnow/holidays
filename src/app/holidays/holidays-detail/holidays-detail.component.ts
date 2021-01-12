import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEventPattern, Observable } from 'rxjs';
import * as dayjs from 'dayjs';
import  'dayjs/locale/en-au';
import { HolidayItem } from '../holiday-item';
import { map } from 'rxjs/operators';
import { MAT_DAYJS_DATE_FORMATS, DayjsDateAdapter } from 'dist/day-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HolidayService } from '../holiday.service';
import { LocationItem } from '../../locations/location-item';

dayjs.locale('en-au');

@Component({
  templateUrl: './holidays-detail.component.html',
  styleUrls: ['./holidays-detail.component.scss'],
  providers: [

    { provide: DateAdapter, useClass: DayjsDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DAYJS_DATE_FORMATS },
  ]
})
export class HolidaysDetailComponent implements OnInit {

holiday$!: Observable<HolidayItem | undefined> | null;
holiday!: HolidayItem | undefined;
holidayRef!: AngularFirestoreDocument<HolidayItem>
// locations!: LocationItem[];
// locationCollectionRef!: AngularFirestoreCollection<LocationItem>
// locationCollection$!: Observable<LocationItem | undefined >;


holidayForm = this.fb.group({
  name: [null, Validators.required],
  location: [],
  dateStart: null,
  dateFinish: null
})

  constructor(private router: Router,
              private route: ActivatedRoute,
              private afs: AngularFirestore,
              private fb: FormBuilder,
              private holidayService: HolidayService) {}

  ngOnInit(): void {
    const holidayId = this.route.snapshot.paramMap.get('id');
    this.holiday$ = this.holidayService.getHolidayDetail(holidayId);

    // getHolidayDetail will return null if no holiday document was found
    // most likely this means the user chose to add a new item

    if (this.holiday$){
      this.holiday$.subscribe(holiday => {
        this.holiday = holiday;
        this.holidayForm.reset(holiday)
      })
    }

    // this.afs.collection<LocationItem>('locations')
    // .valueChanges({itemId: 'id'})
    // .subscribe(res => {
    //   this.locations = res;
    // })
}

save() {

  const newData = this.holidayForm.value as HolidayItem;
  const holidayResult = this.holidayService.updateDetail(newData)
  .then(res => {
    console.log('Holiday updated successfuly');
    this.router.navigate(['../../'], {relativeTo: this.route})
  })
  .catch(err => { console.log('An error occurred', err)})
}

add(data: HolidayItem){
  const collectionRef = this.holidayRef.ref.parent
  return collectionRef.add(data);
}

private formToHoliday(formData: HolidayItem) {

}

}
