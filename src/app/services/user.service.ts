import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest,
  HttpEvent,
  HttpEventType } from '@angular/common/http';
import { User } from '../models/user.model';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  registro(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'registrar', params, { headers: headers });
  }

  login(user, gettoken2 = null): Observable<any> {
    if (gettoken2 != null) {
      user.gettoken = gettoken2;
    }
    
    //let params = JSON.stringify(user);
    let params='{"USUARIO":"EMONTERROSO","CONTRASENIA": "123" }';
    console.log(params);
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',
    'Authorization': 'Basic QVBLOj5HfUcvdzQ9VjZUcVN6Uw=='}); 
    // new HttpHeaders().set({'h1':'v1','h2':'v2'});
    //headers.append('Authorization', 'Basic QVBLOj5HfUcvdzQ9VjZUcVN6Uw==');
    console.log(headers);
    return this._http.post(this.url, params, { headers: headers ,reportProgress: true, observe: 'events'})
    
     /*
   let params='{"USUARIO":"APK","CONTRASENIA": ">G}G/w4=V6TqSzS" }';
    return from(
      fetch(
        'https://services.combexim.com.gt:8081/v2/usuario/login', // the url you are trying to access
        {
          body: params,
          headers: {
            'Content-Type':'application/json; charset=utf-8',
            'Authorization': 'Basic QVBLOj5HfUcvdzQ9VjZUcVN6Uw==',
          },
          method: 'POST', // GET, POST, PUT, DELETE
          //mode: 'no-cors' // the most important option
        }
      ));
     */  
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

  getToken() {
    var token2 = sessionStorage.getItem('token');

    if (token2 != "indefined") {
      this.token = token2
    } else {
      this.token = null;
    }
    return this.token;
  }

  updateUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    return this._http.put(this.url + 'editar-usuario/' + user._id, params, { headers: headers })

  }


}
