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
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from "./components/chatbot/chatbot.component";
import { HomeComponent } from "./home/home.component";
@NgModule ({ 
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        ChatbotComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        InputTextModule,        
        PasswordModule,
        ButtonModule,
        FormsModule,
        CheckboxModule,
        SweetAlert2Module.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
}) 
export class AppModule {}