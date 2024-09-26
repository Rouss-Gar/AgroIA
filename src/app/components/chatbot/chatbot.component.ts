import { Component, Renderer2 } from '@angular/core';

declare global {
  interface Window {
    voiceflow: any;
  }
}
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '66f501d232f136ad60bbebac' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
    };
    this.renderer.appendChild(document.body, script);
  }
}
