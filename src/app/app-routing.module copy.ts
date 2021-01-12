import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HolidaysComponent } from './holidays/holidays.component';
import { HolidaysListComponent } from './holidays/holidays-list/holidays-list.component';
import { HolidaysDetailComponent } from './holidays/holidays-detail/holidays-detail.component';

const routes: Routes = [
  { path: 'holidays', component: HolidaysComponent, children:
    [{ path: 'list', component: HolidaysListComponent},
     { path: 'detail/:id', component: HolidaysDetailComponent},
     { path: '', redirectTo: 'list', pathMatch: 'full'}]},
  { path: '', redirectTo: 'holidays', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
