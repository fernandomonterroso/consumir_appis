import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

//COMPONETS
import {HomeComponent} from "./components/home/home.component";
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { MessageComponent } from './components/message/message.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { PruebaComponent } from './components/prueba/prueba.component';


const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'contactos', component: ContactosComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'bar', component: NavbarComponent},
    {path: 'correo', component: MessageComponent},
    {path: 'tareas', component: TareaComponent},
    {path: 'prueba', component: PruebaComponent},
    {path: '**', component: HomeComponent},

]

export const appRoutingProviers: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

