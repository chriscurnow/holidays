import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HolidayItem } from './holiday-item'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  holidayRef!: AngularFirestoreDocument<HolidayItem>;
  holiday$!: Observable<HolidayItem | undefined>;
  isNew: boolean = false;
  holidayId!: string | null;

  constructor(private afs: AngularFirestore) { }

  getHolidayDetail(holidayId: string | null ) {
    this.holidayId = holidayId;
    if(holidayId === 'new') {
      this.isNew = true;
      return null;
    } else {
      this.holidayRef = this.afs.doc<HolidayItem>(`Holidays/${holidayId}`)

    this.holiday$ = this.holidayRef
    .valueChanges();

    return this.holiday$.pipe(map(holiday => {
      if(holiday){
        holiday.dateStart = dayjs.unix(holiday.dateStart.seconds);
        holiday.dateFinish = dayjs.unix(holiday.dateFinish.seconds)
      }
      return holiday;
    }))
    }
  }

  updateDetail(newData: HolidayItem){

    let datejs = dayjs(newData.dateStart);
    let unixSeconds = datejs.unix();
    newData.dateStart = {seconds: unixSeconds, nanoseconds: 0}

    datejs = dayjs(newData.dateFinish);
    unixSeconds = datejs.unix();
    newData.dateFinish = {seconds: unixSeconds, nanoseconds: 0};
    if (this.holidayId === 'new' ) {
      this.holidayId = this.afs.createId();
    }
    newData.id = this.holidayId ? this.holidayId : '';

    console.log('Data to save', newData);
    if (this.isNew) {
      newData.id = this.afs.createId();
      this.isNew = false;
      const collectionRef = this.afs.collection<HolidayItem>('Holidays')
      return collectionRef.add(newData)
        .then(res => { return this.doNothing()})
      // const result = doc.set(newData);

    }
    return this.holidayRef.update(newData);
  }

  doNothing(): void{

  }
}
