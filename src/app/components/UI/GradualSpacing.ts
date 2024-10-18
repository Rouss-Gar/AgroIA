import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-gradual-spacing',
  template: `
    <div class="flex justify-center space-x-1">
      <ng-container *ngFor="let char of splitText; let i = index">
        <h1
          *ngIf="char !== ' ' else space"
          [@fadeInOut]="animationState[i]"
          [ngClass]="['drop-shadow-sm', className]"
          [style.transition]="transitionStyle(i)"
          [style.opacity]="animationState[i] === 'visible' ? 1 : 0"
          [style.transform]="animationState[i] === 'visible' ? 'translateX(0)' : 'translateX(-20px)'"
        >
          {{ char }}
        </h1>
        <ng-template #space>
          <span>&nbsp;</span>
        </ng-template>
      </ng-container>
    </div>
  `,
  animations: [
    trigger('fadeInOut', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('{{duration}}ms {{delay}}ms')),
      transition('visible => hidden', animate('{{duration}}ms')),
    ]),
  ],
})
export class GradualSpacingComponent {
  @Input() text: string = '';
  @Input() duration: number = 500; // default is 500ms
  @Input() delayMultiple: number = 40; // default is 40ms
  @Input() className?: string;

  splitText: string[] = [];
  animationState: string[] = [];

  ngOnInit() {
    this.splitText = this.text.split('');
    this.animationState = this.splitText.map((_, i) => (i === 0 ? 'visible' : 'hidden'));
    this.startAnimation();
  }

  startAnimation() {
    this.splitText.forEach((_, i) => {
      setTimeout(() => {
        this.animationState[i] = 'visible';
      }, i * this.delayMultiple);
    });
  }

  transitionStyle(i: number): string {
    return `${this.duration}ms ${i * this.delayMultiple}ms`;
  }
}
