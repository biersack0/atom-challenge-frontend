import { Component, ElementRef, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationUtils } from '@app/shared/utils/validation.utils';

@Component({
  selector: 'app-control-message',
  standalone: true,
  templateUrl: './control-message.component.html',
})
export class ControlMessageComponent extends ValidationUtils {
  @Input() control!: AbstractControl;

  constructor(private el: ElementRef<HTMLElement>) {
    super();
  }

  get message(): string | null {
    if (!this.control) return null;
    const { touched, errors, valid } = this.control;
    if (!touched || !errors || valid) return null;

    const firstError = Object.keys(errors)[0];

    this.addClass(!valid && touched);
    return this.getMessage(firstError);
  }

  addClass(isInvalid: boolean): void {
    const classListInput = this.el.nativeElement.querySelector('div > *')!.classList;
    classListInput.toggle('is-invalid', isInvalid!);
  }
}
