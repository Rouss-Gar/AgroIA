import { Component } from '@angular/core';
import { authservices } from '../../auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  username: string = '';  
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;

  constructor(private authservices: authservices, private router: Router) {}

  async login() {
    if (!this.email || !this.password) {
      Swal.fire('Error', 'Por favor ingresa un correo electrónico y una contraseña', 'warning');
      return;
    }
  
    if (!this.isValidEmail(this.email)) {
      Swal.fire('Error', 'El formato del correo electrónico no es válido', 'warning');
      return;
    }
  
    this.isLoading = true;
    try {
      const message = await this.authservices.login(this.email, this.password);
      
      console.log(message);
      Swal.fire('Inicio de sesión exitoso', 'Has iniciado sesión correctamente', 'success');
      this.authservices.redirectToHome(); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      if (error === 'auth/user-not-found') {
        Swal.fire('Error', 'Este correo electrónico no está registrado', 'error');
      } else if (error === 'auth/wrong-password') {
        Swal.fire('Error', 'Contraseña incorrecta', 'error');
      } else {
        Swal.fire('Error', 'Correo electrónico o contraseña incorrectos', 'error');
      }
    } finally {
      this.isLoading = false;
    }
  }
  
  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
    
  async loginWithGoogle() {
    this.isLoading = true;
    try {
      const message = await this.authservices.loginWithGoogle();
      console.log(message);    
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async loginWithFacebook() {
    this.isLoading = true;
    try {
      const message = await this.authservices.loginWithFacebook();
      console.log(message);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}