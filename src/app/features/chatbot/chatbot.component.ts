import { Component } from '@angular/core';
import { authservices } from '../../auth/auth.service'; 
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent {
[x: string]: any;

constructor(private authservices: authservices, private router: Router) {}

}