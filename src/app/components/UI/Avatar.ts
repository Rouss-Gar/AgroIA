import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div
      class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
      [ngClass]="customClass"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class AvatarComponent {
  @Input() customClass: string = '';
}

@Component({
  selector: 'app-avatar-image',
  template: `
    <img
      [src]="src"
      [alt]="alt"
      class="aspect-square h-full w-full"
      [ngClass]="customClass"
    />
  `,
})
export class AvatarImageComponent {
  @Input() src!: string;
  @Input() alt: string = '';
  @Input() customClass: string = '';
}

@Component({
  selector: 'app-avatar-fallback',
  template: `
    <div
      class="flex h-full w-full items-center justify-center rounded-full bg-muted"
      [ngClass]="customClass"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class AvatarFallbackComponent {
  @Input() customClass: string = '';
}