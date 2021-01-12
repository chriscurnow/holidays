import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appFilterSelect]'
})
export class FilterSelectDirective {

  topValue!: string | null;

  @Input() dropdownList!: Set<string>;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('blur') AutoSelectValue() {
      const value = this.el.nativeElement.value;
      this.topValue = this.dropdownList.values().next().value;
      if (!this.topValue || !value) {
          (this.el.nativeElement as HTMLInputElement).value = '';
      } else {
          (this.el.nativeElement as HTMLInputElement).value = this.topValue;
      }
  }

}
