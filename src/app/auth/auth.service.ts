import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import Firebase from "firebase/compat/app";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class authservices {  
  user$: Observable<Firebase.User | null>;
  constructor(
    private afauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    
  ) {
    this.user$ = afauth.authState;
  }

  async login(email: string, password: string): Promise<string> {
    try {
      // Iniciar sesión en Firebase
      await this.afauth.signInWithEmailAndPassword(email, password);
      
      this.router.navigate(['/home']);
      return 'Inicio de sesión exitoso';
    } catch (error: any) {
      console.error('Error en el login:', error);
  
      if (error.code === 'auth/user-not-found') {
        throw 'auth/user-not-found';
      } else if (error.code === 'auth/wrong-password') {
        throw 'auth/wrong-password';
      } else if (error.code === 'auth/invalid-email') {
        throw 'auth/invalid-email';
      } else {
        throw 'login failed';
      }
    }
  }
  
  redirectToHome() {
    this.router.navigate(['/home']);
  }
  async loginWithFacebook(): Promise<string> {
    const provider = new Firebase.auth.FacebookAuthProvider();
    try {
      const result = await this.afauth.signInWithPopup(provider);
      this.router.navigate(['/home']);
      const user = result.user;
      console.log('Usuario autenticado con Facebook:', user);
      return 'Login with Facebook successful';
    }catch (error: unknown) {
      console.error('Error al iniciar sesión con Facebook:', error);
      return this.geterror(error, 'Login with Facebook failed');
    }
  }
  async loginWithGoogle(): Promise<string> {
    const provider = new Firebase.auth.GoogleAuthProvider();
    try {
      const result = await this.afauth.signInWithPopup(provider);
      this.router.navigate(['/home']);
      const user = result.user;
      console.log('Usuario autenticado con Google:', user);
      return 'Login with Google successful';
    } catch (error: unknown) {
      console.error('Error al iniciar sesión con Google:', error);
      return this.geterror(error, 'Login with Google failed');
    }
  }
  async logout(): Promise<string> {
    try {
      await this.afauth.signOut();
      this.router.navigate(['/login']);
      return 'Cierre de sesión exitoso';
    } catch (error: unknown) {
      console.error('Error durante el cierre de sesión', error);
      return this.geterror(error, 'Error al cerrar sesión');
    }
  }
  async register(email: string, password: string, username: string): Promise<string> {
    try {
      const userCredential = await this.afauth.createUserWithEmailAndPassword(email, password);
      await this.firestore.collection('users').doc(userCredential.user?.uid).set({
        email: email,
        username: username
      });
      return 'Registration successful'; 
    } catch (error: unknown) {
      console.error('Error during registration:', error);
      return this.geterror(error, 'Registration failed');
    }    
  }
  
  private geterror(error: unknown, defaultMsg: string): string {
    if (error instanceof Error) {
      // Mensajes específicos para errores de Firebase
      if (error.message.includes('auth/email-already-in-use')) {
        return 'El correo electrónico ya está en uso.';
      } else if (error.message.includes('auth/wrong-password')) {
        return 'La contraseña es incorrecta.';
      } else if (error.message.includes('auth/user-not-found')) {
        return 'No se encontró un usuario con este correo electrónico.';
      } else if (error.message.includes('auth/invalid-email')) {
        return 'El correo electrónico no es válido.';
      }
      return `${defaultMsg}: ${error.message}`;
    } else if (typeof error === 'string') {
      return `${defaultMsg}: ${error}`;
    } else {
      return defaultMsg;
    }
  }

  private isEmail(input: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  }  
}