import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LocationItem } from '../../../locations/location-item';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSelectComponent implements OnInit {

locations!: LocationItem[]

  constructor() {
    this.locations = [{
      id: 'a',
      name: '27 Chatswood Drive',
      city: 'Anglesea',
      state: 'Victoria'
    },
    { id: 'b',
      name: 'Fraser Avenue',
      city: 'Anglesea',
      state: 'Victoria'}]
   }

  ngOnInit(): void {
  }

}
