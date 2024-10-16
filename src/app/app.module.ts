import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CheckboxModule } from 'primeng/checkbox';
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "./environment/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from "./features/register/register.component";
import { LoginComponent } from "./features/login/login.component";
import { FormsModule } from '@angular/forms';
import { HomeComponent } from "./home/home.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypingAnimationComponent } from './components/iu/TypingAnimation';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
import { RetroGridComponent } from "./components/iu/RetroGrid";
@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,        
        HomeComponent,        
        ChatbotComponent,
        TypingAnimationComponent,
        RetroGridComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        FormsModule,
        CommonModule,
        CheckboxModule,
        SweetAlert2Module.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }