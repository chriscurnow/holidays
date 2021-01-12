/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Inject, Injectable, Optional, InjectionToken} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import * as utc from 'dayjs/plugin/utc';
import * as localeData from 'dayjs/plugin/localeData';
import * as LocalizedFormat from 'dayjs/plugin/localizedFormat';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Dayjs.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// TODO(mmalerba): See if we can clean this up at some point.
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

dayjs.extend(localeData) // use plugin
dayjs.locale('ko') // use locale


/** Configurable options for {@see DayjsDateAdapter}. */
export interface MatDayjsDateAdapterOptions {

  /**
   * When enabled, the dates have to match the format exactly.
   * See https://momentjs.com/guides/#/parsing/strict-mode/.
   */
  strict?: boolean;

  /**
   * Turns the use of utc dates on or off.
   * Changing this will change how Angular Material components like DatePicker output dates.
   * {@default false}
   */
  useUtc?: boolean;
}

/** InjectionToken for moment date adapter to configure options. */
export const MAT_DAYJS_DATE_ADAPTER_OPTIONS = new InjectionToken<MatDayjsDateAdapterOptions>(
  'MAT_DAYJS_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY
});


/** @docs-private */
export function MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY(): MatDayjsDateAdapterOptions {
  return {
    useUtc: false
  };
}


/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}


/** Adapts Dayjs.js Dates for use with Angular Material. */
@Injectable()
export class DayjsDateAdapter extends DateAdapter<Dayjs> {
  // Note: all of the methods that accept a `Dayjs` input parameter immediately call `this.clone`
  // on it. This is to ensure that we're working with a `Dayjs` that has the correct locale setting
  // while avoiding mutating the original object passed to us. Just calling `.locale(...)` on the
  // input would mutate the object.

  private _localeData!: {
    firstDayOfWeek: number,
    longMonths: string[],
    shortMonths: string[],
    dates: string[],
    longDaysOfWeek: string[],
    shortDaysOfWeek: string[],
    narrowDaysOfWeek: string[]
  };

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string,
    @Optional() @Inject(MAT_DAYJS_DATE_ADAPTER_OPTIONS)
    private _options?: MatDayjsDateAdapterOptions) {

    super();
    this.initializeParser(dateLocale);
  }

  setLocale(locale: string) {
    super.setLocale(locale);

    const dayjsLocaleData = dayjs().localeData();
    this._localeData = {
      firstDayOfWeek: dayjsLocaleData.firstDayOfWeek(),
      longMonths: dayjsLocaleData.months(),
      shortMonths: dayjsLocaleData.monthsShort(),
      dates: range(31, (i) => this.createDate(2017, 0, i + 1).format('D')),
      longDaysOfWeek: dayjsLocaleData.weekdays(),
      shortDaysOfWeek: dayjsLocaleData.weekdaysShort(),
      narrowDaysOfWeek: dayjsLocaleData.weekdaysMin(),
    };
  }

  getYear(date: Dayjs): number {
    return this.clone(date).year();
  }

  getMonth(date: Dayjs): number {
    return this.clone(date).month();
  }

  getDate(date: Dayjs): number {
    return this.clone(date).date();
  }

  getDayOfWeek(date: Dayjs): number {
    return this.clone(date).day();
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    // Dayjs.js doesn't support narrow month names, so we just use short if narrow is requested.
    return style == 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
  }

  getDateNames(): string[] {
    return this._localeData.dates;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style == 'long') {
      return this._localeData.longDaysOfWeek;
    }
    if (style == 'short') {
      return this._localeData.shortDaysOfWeek;
    }
    return this._localeData.narrowDaysOfWeek;
  }

  getYearName(date: Dayjs): string {
    return this.clone(date).format('YYYY');
  }

  getFirstDayOfWeek(): number {
    return this._localeData.firstDayOfWeek;
  }

  getNumDaysInMonth(date: Dayjs): number {
    return this.clone(date).daysInMonth();
  }

  clone(date: Dayjs): Dayjs {
    return date.clone().locale(this.locale);
  }

  createDate(year: number, month: number, date: number): Dayjs {
    const returnDayjs = dayjs()
      .set('year', year)
      .set('month', month)
      .set('date', date);
    return returnDayjs;
  }

  // createDate(year: number, month: number, date: number): Dayjs {
  //   // Dayjs.js will create an invalid date if any of the components are out of bounds, but we
  //   // explicitly check each case so we can throw more descriptive errors.

  //   // I have no idea where ngDevMode comes from

  //   // if (typeof ngDevMode === 'undefined' || ngDevMode) {
  //     if (month < 0 || month > 11) {
  //       throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
  //     }

  //     if (date < 1) {
  //       throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
  //     }
  //   // }

  //   const tempResult = this._createDayjs({year, month, date})
  //   const result = tempResult.locale(this.locale);
  //   // If the result isn't valid, the date must have been out of bounds for this month.

  //   // && (typeof ngDevMode === 'undefined' || ngDevMode)

  //   if (!result.isValid()) {
  //     throw Error(`Invalid date "${date}" for month with index "${month}".`);
  //   }

  //   return result;
  // }

  today(): Dayjs {
    return this._createDayjs().locale(this.locale);
  }

  parse(value: any, parseFormat: string | string[]): Dayjs | null {
    if (value && typeof value == 'string') {
      return this._createDayjs(value, parseFormat, this.locale);
    }
    return value ? this._createDayjs(value).locale(this.locale) : null;
  }

  format(date: Dayjs, displayFormat: string): string {
    date = this.clone(date);

    // && (typeof ngDevMode === 'undefined' || ngDevMode)

    if (!this.isValid(date)) {
      throw Error('DayjsDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }


  // TODO: 'add' is not currently working in dayjs-date-adapter
  addCalendarYears(date: Dayjs, years: number): Dayjs {
    return date.add(years, 'year');
  }

  addCalendarMonths(date: Dayjs, months: number): Dayjs {
    return date.add(months, 'month');
  }

  addCalendarDays(date: Dayjs, days: number): Dayjs {
    return date.add(days, 'day');
  }

  toIso8601(date: Dayjs): string {
    return date.toISOString();
  }

  /**
   * Returns the given value if given a valid Dayjs or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Dayjss and empty
   * string into null. Returns an invalid date for all other values.
   */
  deserialize(value: any): Dayjs | null {
    let date;
    if (value instanceof Date) {
      date = this._createDayjs(value).locale(this.locale);
    } else if (this.isDateInstance(value)) {
      // Note: assumes that cloning also sets the correct locale.
      return this.clone(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = this._createDayjs(value).locale(this.locale);
    }
    if (date && this.isValid(date)) {
      return this._createDayjs(date).locale(this.locale);
    }
    return super.deserialize(value);
  }

  isDateInstance(obj: any): boolean {
    return dayjs.isDayjs(obj);
  }

  isValid(date: Dayjs): boolean {
    return this.clone(date).isValid();
  }

  invalid(): Dayjs {
    return dayjs('');
  }

  /** Creates a Dayjs instance while respecting the current UTC settings. */
  private _createDayjs(
    date?: any,
    format?: any,
    locale?: string,
  ): Dayjs {
    const {strict, useUtc}: MatDayjsDateAdapterOptions = this._options || {};

    return useUtc
      ? dayjs.utc(date, format)
      : dayjs(date, format, locale, strict);
  }

  private get shouldUseUtc(): boolean {
    const { useUtc }: MatDayjsDateAdapterOptions = this._options || {};
    return !!useUtc;
  }

  private initializeParser(dateLocale: string) {
    if (this.shouldUseUtc) {
      dayjs.extend(utc);
    }

    dayjs.extend(LocalizedFormat);
    dayjs.extend(customParseFormat);
    dayjs.extend(localeData);

    this.setLocale(dateLocale);
  }
}
