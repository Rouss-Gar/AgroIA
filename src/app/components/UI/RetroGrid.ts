import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-retro-grid',
  template: `
    <div
      class="pointer-events-none absolute size-full overflow-hidden opacity-50 [perspective:200px]"
      [ngStyle]="{ '--grid-angle': angle + 'deg' }"
    >
      <div class="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          class="animate-grid [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]"
          [ngClass]="{
            'bg-light': !isDark,
            'bg-dark': isDark
          }"
        ></div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black"></div>
    </div>
  `,
  styles: [
    `
      .bg-light {
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0.3) 1px, transparent 0),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 1px, transparent 0);
      }

      .bg-dark {
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 0),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 0);
      }
    `,
  ],
})
export class RetroGridComponent {
  @Input() angle: number = 65; 
  @Input() isDark: boolean = false; 
}
