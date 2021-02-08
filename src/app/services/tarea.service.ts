import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, identity } from 'rxjs';
import { Tarea } from '../models/tarea.model';
import { User } from '../models/user.model';
import { UserService } from 'src/app/services/user.service';
@Injectable()
export class TareaService {
  public url: string;
  public token;
  public retenerToken;
  public identity;
  constructor(public _http: HttpClient ,
    public _userService: UserService) { 
    this.url= GLOBAL.url;
    this.retenerToken = this._userService.getToken();
    
  }
  getTareas(token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    return this._http.get(this.url+'listarTareas', {headers:headers})
  }

  getTarea(token,id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    return this._http.get(this.url+'listarTarea/'+id,{headers:headers});
  }

  deleteTarea(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.retenerToken);
    return this._http.delete(this.url+'borrar-tarea/'+id,{headers:headers});
  }

  addTarea(token,tarea:Tarea):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    let params=JSON.stringify(tarea);
    return this._http.post(this.url+'crearTarea',params,{headers:headers});
  }

  makeFileRequest3(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest;
      for (var i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response)
          }
        }
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Authorization', token)
      xhr.send(formData)
    })
  }

  getIdentity() {
    var identity2 = JSON.parse(sessionStorage.getItem('identity'));
    if (identity2 != "undefined") {
      this.identity = identity2
    } else {
      this.identity = null;

    }
    return this.identity;
  }

  updateTarea(tarea: Tarea): Observable<any> {
    let params = JSON.stringify(tarea);
    
    console.log(this.retenerToken + '--- --- ' + identity)
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.retenerToken);
    return this._http.put(this.url + 'editarTarea/' + tarea._id, params, { headers: headers })

  }


  }