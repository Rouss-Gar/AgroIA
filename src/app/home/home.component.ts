import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isMenuActive: boolean = false;

  // Método para alternar el estado del menú
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
constructor(private router:Router){}

goTologin(){this.router.navigate(['/login'])}

goToregister(){this.router.navigate(['/register'])}

}
