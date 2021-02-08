import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {routing, appRoutingProviers} from "./app.routing";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { MessageComponent } from './components/message/message.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { PruebaComponent } from './components/prueba/prueba.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    PerfilComponent,
    ContactosComponent,
    MessageComponent,
    TareaComponent,
    PruebaComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing, 
  ],
  providers: [
    appRoutingProviers
    
  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
