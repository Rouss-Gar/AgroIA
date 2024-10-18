import { Component } from '@angular/core';
import { authservices } from '../../auth/auth.service'; // Corregir el nombre del servicio
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  
})
export class ChatbotComponent {
  
  // Eliminado: [x: string]: any; ya que no es necesario
  
  constructor(private authService: authservices, private router: Router) {}
}
