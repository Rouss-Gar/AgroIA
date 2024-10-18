import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typing-animation',
  template: `
    <h1 [ngClass]="customClass">{{ displayedText }}</h1>
  `,
})
export class TypingAnimationComponent implements OnInit {
  @Input() text: string = '';
  @Input() duration: number = 200;  // Duración predeterminada
  @Input() customClass: string[] = [];  // Para las clases CSS dinámicas

  displayedText: string = '';
  private index: number = 0;

  ngOnInit(): void {
    this.startTyping();
  }

  startTyping() {
    const interval = setInterval(() => {
      if (this.index < this.text.length) {
        this.displayedText += this.text.charAt(this.index);
        this.index++;
      } else {
        clearInterval(interval);
      }
    }, this.duration);
  }
}
