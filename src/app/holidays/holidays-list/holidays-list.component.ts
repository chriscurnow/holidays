import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HolidaysListDataSource, HolidaysListItem } from './holidays-list-datasource';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { HolidayItem } from '../holiday-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-holidays-list',
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.scss']
})
export class HolidaysListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<HolidayItem>;
  dataSource!: MatTableDataSource<HolidayItem>;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'name', 'locationName', 'locationCity', 'dateStart', 'dateFinish'];

constructor(private afs: AngularFirestore,
            private router: Router,
            private route: ActivatedRoute){
  dayjs.extend(utc);
  dayjs.extend(timezone);

}

  ngOnInit() {
    console.log('Guess timezone', dayjs.tz.guess())
    this.afs.collection<HolidayItem>('Holidays', ref => ref
    .orderBy('name'))
    .valueChanges({idField: 'id'})
    .subscribe(listResult => {
      console.log('Result of collection', listResult)
      this.dataSource = new MatTableDataSource(listResult);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  formatDate(unixDate: any) {

    const date =  dayjs.unix(unixDate.seconds);
    return date.format('DD/MM/YYYY');
    // const dateString: any = dayjs.tz(date, "Australia/Melbourne");
    // return dateString
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  onClicked(row: HolidayItem) {
    this.router.navigate(['../detail', row.id], {relativeTo: this.route})
  }

  new() {
    this.router.navigate(['../detail', 'new'], {relativeTo: this.route})
  }
}
