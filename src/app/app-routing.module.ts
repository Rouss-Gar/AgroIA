import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
    {
        path: '', redirectTo: '/register', pathMatch: 'full' 
    },
    {
        path: 'register', component: RegisterComponent 
    },

    {
        path: '', redirectTo: '/login', pathMatch: 'full' 
    },
    {
        path: 'login', component: LoginComponent 
    },
    
    {
        path: 'home', component: HomeComponent 
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
