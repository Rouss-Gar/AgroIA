import { Component } from '@angular/core';
import { WitAiService } from '@/src/service/wit.service';

@Component({
  selector: 'app-wit-ai-chat',
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent {
  question: string = '';
  response: string = '';

  constructor(private witAiService: WitAiService) {}

  async handleSubmit() {
    try {
      const data = await this.witAiService.getWitAiResponse(this.question);
      const { entities } = data;

      if (entities && Object.keys(entities).length > 0) {        
        const values = Object.keys(entities).flatMap((key) =>
          entities[key].map((entity: any) => entity.value)
        );

        this.response = values.length > 0 ? values.join(', ') : 'No se encontraron valores en las entidades.';
      } else {
        this.response = 'No se encontraron entidades.';
      }

      console.log('Entidades procesadas:', entities);
    } catch (error) {
      console.error('Error en la comunicación con Wit.ai:', error);
      this.response = 'Hubo un error al obtener la respuesta.';
    }
  }
}
