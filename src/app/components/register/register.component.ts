import { Component } from '@angular/core';
import { authservices } from '../../auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  email: string = '';
  password: string = '';
  username: string = '';  
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;
  showPassword: boolean = false; 

  constructor(private authservices: authservices, private router: Router) {}  

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  async register() {  
    if (!this.isValidEmail(this.email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo no válido',
        text: 'Por favor, ingresa un correo electrónico válido.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.isLoading = true;
    try {
      const message = await this.authservices.register(this.email, this.password, this.username);

      Swal.fire({
        icon: message === 'Registration successful'? 'success': 'error',
        title: message === 'Registration successful'? 'register exitoso':'error',
        text: message,
        confirmButtonText: 'Aceptar'
      });

      this.router.navigate(['/login']);
    } catch (error: unknown) {
      let errorMessage = 'Ocurrió un error. Inténtalo de nuevo más tarde.';
      if (error instanceof Error) {
        if (error.message.includes('auth/email-already-in-use')) {
          errorMessage = 'El correo electrónico ya está en uso.';
        } else if (error.message.includes('auth/weak-password')) {
          errorMessage = 'La contraseña es demasiado débil.';
        } else if (error.message.includes('auth/invalid-email')) {
          errorMessage = 'El correo electrónico no es válido.'
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'Aceptar'
      });
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}