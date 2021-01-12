import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSelectDirective } from './directives/filter-select.directive';
// import { FilterSelectComponent } from './components/filter-select/filter-select.component';




@NgModule({
  declarations: [FilterSelectDirective,
                  // FilterSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [FilterSelectDirective,
            //FilterSelectComponent
          ]
})
export class SharedModule { }
