import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/models/contacto.models';
import { User } from 'src/app/models/user.model';
import {ContactosService } from 'src/app/services/contactos.service';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global.service';
 import Swal from'sweetalert2'
 import {Router} from "@angular/router";
@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
  providers: [ContactosService,UserService,UploadService]
})
export class ContactosComponent implements OnInit {
  public url;
  public identity;
  public token;
  public status;
  

  //Encuestas variables

  public contactos: Contacto;
  public modelContactos: Contacto;
  public modelUsuarios: User;

  constructor(
    private _router: Router,
    private _contactoService: ContactosService,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.url= GLOBAL.url;
    
    this.token = this._userService.getToken();
    this.modelContactos = new Contacto ("","","","","","","","","");
    this.modelUsuarios = new User("","","","","","","");
   }

  ngOnInit() {
    

this.hola();

    
  }

  hola(){
    var sesion = sessionStorage.getItem('token');
    console.log("ssss"+sesion)
      if (sesion == null) {
        
        this._router.navigate(['/login'])
        console.log("Adios")
      } else {
        console.log("Hola")
        
        this.getContactos()
      }
  }

  getContactos(){
    this._contactoService.getContactos(this.token).subscribe(
      response=>{
        if(response.contactos){
          this.contactos = response.contactos;
          this.status='Ok'
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage !=null){
          this.status = 'error'
        }
      }
    )
  }

  getContacto(id){
    this._contactoService.getContacto(this.token,id).subscribe(
      response=>{
        if(response.contacto){
         console.log(response.contacto);
         this.modelContactos = response.contacto;
         
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage !=null){
          this.status = 'error'
        }
      }
    )
  }

  eliminarContacto(id){
    if(confirm('¿Esta seguro de elimar este contacto?')){
      this._contactoService.deleteContacto(id).subscribe(
        response=>{
          if(response.Contacto){
            console.log(response.contacto);
            this.getContactos();
            this.status = 'Ok'
          }
        },
        error=>{
          var errorMessage = <any>error;
          console.log(errorMessage)
          if(errorMessage !=null){
            this.status = 'error'
          }
        }
      )
    }
  }

  // para correos

  contactForm(form){
    this._contactoService.correoInfo(this.token,form).subscribe(()=>{
      Swal.fire("Formulario de contacto", "Mensaje enviado correctamente", 'success')
      console.log(form);
      alert('funciono')
    })
  }

  addContacto(){
    this._contactoService.addContacto(this.token,this.modelContactos)
    .subscribe(
      response=>{
        if(response.contacto){
          console.log(response.contacto);
          this.getContactos();
          this.status = 'Ok'
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage !=null){
          this.status = 'error'
        }
      }
    )
  }

  editContacto() {
    this._contactoService.updateContacto(this.modelContactos).subscribe(
      response => {
        if (!response.Contacto) {
          this.status = 'error'
          console.log(response)
        } else {
          this.status = 'ok'
          if(this.filesToUpload)
          //SUBIR IMAGEN DE USER
          this._contactoService.makeFileRequest2(this.url + 'subir-imagen-contacto/' + this.modelContactos._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              
              console.table(result);
              this.modelContactos.image = result.contacto.image;
              // this._route.navigate(['/home'])
            })
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }

      }
    )
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}

