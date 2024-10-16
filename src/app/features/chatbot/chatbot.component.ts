import { Component } from '@angular/core';
import { WitAiService } from '@/src/service/wit.service';

@Component({
  selector: 'app-wit-ai-chat',
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent {
  question: string = '';
  response: string = '';
  recognition: any;
  messages: { text: string; sender: string; time: string }[] = [];


  constructor(private witAiService: WitAiService) {
    const { webkitSpeechRecognition }: any = window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'es-ES';
    this.recognition.continuous = false;
    this.recognition.iterimResults = false;

    this.recognition.onresult = (event: any) => {
      this.question = event.results[0][0].transcript;  // Convierte la voz a texto
      console.log('Texto detectado por voz:', this.question);
      this.handleSubmit();  // Enviar la pregunta obtenida por voz
    };
    this.recognition.onerror = (event: any) => {
      console.error('Error en el reconocimiento de voz:', event.error);
    };
  }

  startVoiceRecognition() {
    this.recognition.start();
  }

  // Método para enviar mensajes y recibir respuestas del bot
  async handleSubmit() {
    if (this.question.trim()) {
      // Agregar el mensaje del usuario al array de mensajes
      const userMessage = {
        text: this.question,
        sender: 'user',
        time: this.getTime()
      };
      this.messages.push(userMessage);

      try {
        
        const data = await this.witAiService.getWitAiResponse(this.question);
        const { entities } = data;

        let botResponse = '';

        if (entities && Object.keys(entities).length > 0) {        
          const values = Object.keys(entities).flatMap((key) =>
            entities[key].map((entity: any) => entity.value)
          );

          botResponse = values.length > 0 ? values.join(', ') : 'No se encontraron valores en las entidades.';
        } else {
          botResponse = 'No se encontraron entidades.';
        }

        // Agregar la respuesta del bot al array de mensajes
        const botMessage = {
          text: botResponse,
          sender: 'bot',
          time: this.getTime()
        };
        this.messages.push(botMessage);

        // Limpiar el campo de entrada después de enviar
        this.question = '';

        console.log('Entidades procesadas:', entities);
      } catch (error) {
        console.error('Error en la comunicación con Wit.ai:', error);
        const errorMessage = {
          text: 'Hubo un error al obtener la respuesta.',
          sender: 'bot',
          time: this.getTime()
        };
        this.messages.push(errorMessage);
      }
    }
  }

  // Método para obtener la hora actual
  getTime(): string {
    const date = new Date();
    return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)} - ${date.toLocaleDateString()}`;
  }
}
