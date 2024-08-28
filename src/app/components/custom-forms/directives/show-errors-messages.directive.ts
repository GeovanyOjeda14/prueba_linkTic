import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationsDictionary } from '../custom-forms-models';


@Directive({
  selector: '[appShowErrorsMessages]',
  standalone: true
})
export class ShowErrorsMessagesDirective implements OnChanges {

  @Input() controlErrors: ValidationErrors | null = null;
  @Input() validationsDictionary: ValidationsDictionary | null = null;

  constructor(private el: ElementRef<HTMLDivElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controlErrors']) {
      this.createErrorMessages();
    }
  }

  private createErrorMessages() {
    // Clear existing error messages
    this.el.nativeElement.replaceChildren();

    // while (this.el.nativeElement.firstChild) {
    //   this.el.nativeElement.removeChild(this.el.nativeElement.firstChild);
    // }

    if (this.controlErrors) {
      // Iterate over each error key
      Object.keys(this.controlErrors).forEach(errorKey => {
        const message = this.getErrorMessage(errorKey);
        if (message) {
          this.createParagraph(message);
        }
      });
    }
  }

  private getErrorMessage(errorKey: string): string | null {
    if (this.validationsDictionary && this.validationsDictionary[errorKey]) {
      return this.validationsDictionary[errorKey]!;
    }

    // Default messages
    switch (errorKey) {
      case 'required':
        return 'Este campo es obligatorio';
      case 'pattern':
        return '';
      case 'minlength':
        return `Debe tener al menos ${this.controlErrors?.['minlength']?.requiredLength} caracteres`;
      case 'maxlength':
        return `No debe exceder ${this.controlErrors?.['maxlength']?.requiredLength} caracteres`;
      default:
        return null;
    }
  }

  private createParagraph(message: string) {
    const p = this.renderer.createElement('p');
    const text = this.renderer.createText(message);
    this.renderer.addClass(p, 'mt-2');
    this.renderer.addClass(p, 'text-sm');
    this.renderer.addClass(p, 'text-red-600');
    this.renderer.addClass(p, 'dark:text-red-500');
    this.renderer.appendChild(p, text);
    this.renderer.appendChild(this.el.nativeElement, p);
  }

}
