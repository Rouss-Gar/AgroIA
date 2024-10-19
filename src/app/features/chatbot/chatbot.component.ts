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
  messages: { text: string; sender: string; time: string; avatar: string, canPlayVoice: boolean }[] = [];
  userAvatar: string = '../../../assets/avatarChatbot.png';
  botAvatar: string = '../../../assets/avatarUsuario.png';
  utterance: SpeechSynthesisUtterance | null = null;  // Objeto para la síntesis de voz
  speechIndex: number = 0;  // Índice para el texto fragmentado
  speechParts: string[] = [];  // Array para almacenar los fragmentos del texto

  constructor(private witAiService: WitAiService) {
    const { webkitSpeechRecognition }: any = window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'es-ES';
    this.recognition.continuous = false;
    this.recognition.iterimResults = false;

    this.recognition.onresult = (event: any) => {
      this.question = event.results[0][0].transcript;
      console.log('Texto detectado por voz:', this.question);
      this.handleSubmit();
    };
    this.recognition.onerror = (event: any) => {
      console.error('Error en el reconocimiento de voz:', event.error);
    };
  }

  startVoiceRecognition() {
    this.recognition.start();
  }

  async handleSubmit() {
    if (this.question.trim()) {
      const userMessage = {
        text: this.question,
        sender: 'user',
        time: this.getTime(),
        avatar: this.userAvatar,
        canPlayVoice: false  // El mensaje del usuario no se lee
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

        const botMessage = {
          text: botResponse,
          sender: 'bot',
          time: this.getTime(),
          avatar: this.botAvatar,
          canPlayVoice: true  // La respuesta del bot puede leerse
        };
        this.messages.push(botMessage);

        this.question = '';

        console.log('Entidades procesadas:', entities);
      } catch (error) {
        console.error('Error en la comunicación con Wit.ai:', error);
        const errorMessage = {
          text: 'Hubo un error al obtener la respuesta.',
          sender: 'bot',
          time: this.getTime(),
          avatar: this.botAvatar,
          canPlayVoice: false  // Si hay un error, no se habilita la lectura
        };
        this.messages.push(errorMessage);
      }
    }
  }

  getTime(): string {
    const date = new Date();
    return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)} `;
  }

  // Función para dividir el texto por comas y puntos
  splitText(text: string): string[] {
    return text.split(/[,\.]+/).map(part => part.trim()).filter(part => part.length > 0);
  }

  // Función para reproducir en voz alta fragmentos del texto
  playVoice(text: string) {
    // Detener cualquier síntesis de voz en progreso
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();  // Cancela cualquier reproducción en curso
    }

    // Dividimos el texto en fragmentos
    this.speechParts = this.splitText(text);
    this.speechIndex = 0;

    // Reproducimos el primer fragmento
    this.speakNextPart();
  }

  // Función que reproduce el siguiente fragmento del texto
  speakNextPart() {
    if (this.speechIndex < this.speechParts.length) {
      const utterance = new SpeechSynthesisUtterance(this.speechParts[this.speechIndex]);
      utterance.lang = 'es-ES';

      // Evento que indica cuándo se termina de reproducir el fragmento actual
      utterance.onend = () => {
        this.speechIndex++;
        this.speakNextPart();  // Reproduce el siguiente fragmento
      };

      utterance.onerror = (event) => {
        console.error('Error durante la reproducción de audio:', event.error);
      };

      // Iniciar la reproducción del fragmento actual
      speechSynthesis.speak(utterance);
    }
  }
}

