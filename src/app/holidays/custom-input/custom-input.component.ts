import { Component, OnInit, forwardRef, OnDestroy} from '@angular/core';
import { LocationItem } from '../../locations/location-item';
import { AngularFirestore } from '@angular/fire/firestore';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NG_VALIDATORS
} from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss', '../holidays-detail/holidays-detail.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})

export class CustomInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  locations!: LocationItem[]
  form!: FormGroup;
  nameControl!: FormControl;
  filteredLocations!: Observable<any[]>;
  subscriptions: Subscription[] = [];
  options: any[] = [];


  constructor(private afs: AngularFirestore,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      id: [],
      name: [],
      city: [''],
      state: []
    })

    this.nameControl = this.form.get('name') as FormControl

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );

    this.afs.collection<LocationItem>('locations')
    .valueChanges({itemId: 'id'})
    .subscribe(res => {
      this.options = res;
    })

   }

   ngOnInit() {

   }

   ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

   displayFn(value: any): string {

    console.log('%cCUSTOM INPUT COMPONENT Display function, value', 'color:blue', value)
    return value && typeof value === 'object' ? value.name : value;
  }


   get cityControl() {
    return this.form.controls.city;
  }

   optionSelected(option: LocationItem) {
    console.log('on option selected', option);
    // this.nss.updateproject(option);
    this.form.reset(option);

  }

  get value(): LocationItem {
    console.log('Get value', this.form.value)
    return this.form.value;
  }

  set value(value: LocationItem) {
    console.log('Set value', value)
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: LocationItem) {
    if (value) {
      console.log('write value', value)
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.form.valid ? null : { location: { valid: false } };
  }

  onOptionSelected(location: LocationItem) {
    this.form.reset(location);
  }

}
