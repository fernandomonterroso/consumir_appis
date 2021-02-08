import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto.models';
import { User } from '../models/user.model';
import { UserService } from 'src/app/services/user.service';
@Injectable()
export class ContactosService {
  public url: string;
  public token;
  public retenerToken;
  public identity;
  constructor(public _http: HttpClient ,
    public _userService: UserService) { 
    this.url= GLOBAL.url;
    this.retenerToken = this._userService.getToken();
    
  }
  getContactos(token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    return this._http.get(this.url+'listarContactos', {headers:headers})
  }

  getContacto(token,id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    return this._http.get(this.url+'listarContacto/'+id,{headers:headers});
  }

  deleteContacto(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.retenerToken);
    return this._http.delete(this.url+'borrar-contacto/'+id,{headers:headers});
  }

  addContacto(token,contacto:Contacto):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    let params=JSON.stringify(contacto);
    return this._http.post(this.url+'crear-contacto',params,{headers:headers});
  }

  makeFileRequest2(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
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

  updateContacto(contacto: Contacto): Observable<any> {
    let params = JSON.stringify(contacto);
    
    console.log(this.retenerToken + '---  ' + 'identity2')
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.retenerToken);
    return this._http.put(this.url + 'editarContacto/' + contacto._id, params, { headers: headers })

  }

  // para correo
  correoInfo(token, body): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.retenerToken);
    console.log(this.retenerToken);
    return this._http.post(this.url + 'correo', body, { headers: headers })
  }

  }