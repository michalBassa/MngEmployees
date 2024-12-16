import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHideIfEmpty]',
  standalone: true
})
export class HideIfEmptyDirective  {
  constructor(private readonly elementRef: ElementRef) {}
  @Input()
  set data(value: any[]) {
    if (!value || !value.length) {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

}
