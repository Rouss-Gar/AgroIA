import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
import { NavbarComponent } from './features/navbar/navbar.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/chatbot',
    pathMatch: 'full',
  },
  {
    path: 'chatbot',
    component: ChatbotComponent,
  },
  {
    path: '',
    redirectTo: '/navbar',
    pathMatch: 'full',
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
