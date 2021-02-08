import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tarea.model';
import {TareaService } from 'src/app/services/tarea.service';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global.service';
@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss'],
  providers: [TareaService,UserService,UploadService]
})
export class TareaComponent implements OnInit {
  public url;
  public identity;
  public token;
  public status;

  //Encuestas variables

  public tareas: Tarea;
  public modelTareas: Tarea;

  constructor(
    private _tareaService: TareaService,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.url= GLOBAL.url;
    
    this.token = this._userService.getToken();
    this.modelTareas = new Tarea ("","","","","","");
   }

  ngOnInit() {
    this.getTareas()
  }

  getTareas(){
    this._tareaService.getTareas(this.token).subscribe(
      response=>{
        if(response.tareas){
          this.tareas = response.tareas;
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
    //this.getTareas()
  }

  getTarea(id){
    this._tareaService.getTarea(this.token,id).subscribe(
      response=>{
        if(response.tarea){
         console.log(response.tarea);
         this.modelTareas = response.tarea;
         
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

  eliminarTarea(id){
    if(confirm('¿Esta seguro de elimar esta tarea?')){
      this._tareaService.deleteTarea(id).subscribe(
        response=>{
          if(response.tarea){
            console.log(response.tarea);
            this.getTareas();
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

  addTarea(){
    this._tareaService.addTarea(this.token,this.modelTareas)
    .subscribe(
      
      response=>{
        console.log(response);
        if(response.tarea){
          console.log(response.tarea)
          this.getTareas();
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

  editTarea() {
    this._tareaService.updateTarea(this.modelTareas).subscribe(
      response => {
        if (!response.tarea) {
          this.status = 'error'
          console.log(response)
        } else {
          this.status = 'ok'
          if(this.filesToUpload)
          //SUBIR IMAGEN DE USER
          this._tareaService.makeFileRequest3(this.url + 'subir-imagen-tarea/' + this.modelTareas._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              
              console.table(result);
              this.modelTareas.image = result.tarea.image;
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
    this.getTareas();
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  
}


