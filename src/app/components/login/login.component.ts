import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import {Router} from "@angular/router";
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
public user: User;
public identity;
public token;
public status;
  constructor(
    private _router: Router,
    private _userService: UserService
  ) { 
    this.user = new User("","","","","","","");
  }

  ngOnInit() {
  }

getToken(){
  this._userService.login(this.user, 'true').subscribe(
    response =>{
      this.token = response.token;
      console.log(this.token)
      if(this.token.length <= 0){
        this.status = 'error'
      }else{
        sessionStorage.setItem('token', this.token)
      }
    },
    error =>{
      var errorMessage = <any>error;
      console.log(errorMessage);
      if(errorMessage !=null){
        this.status = 'error';
      }
    }
  )
}

login(){

  const element = <HTMLElement> document.getElementsByClassName('progress-bar')[0];
  /*
  this._userService.login(this.user).subscribe(
    response=>{
      console.log(console.log(response));
      element.style.width = '10%';
      //console.log(JSON.stringify(response));
      this.identity = response.user;
      if(!this.identity){
        this.status = 'error';
      }else{
        sessionStorage.setItem('identity', JSON.stringify(this.identity));
        console.log(this.identity)
        this.getToken();
        this.status = 'ok';
        //a donde va la pagina
        this._router.navigate(['/contactos']);
      }
      console.log(this.status);
    },
    error =>{
      console.log(JSON.stringify(error));
      var errorMessage = <any>error;
      console.log(errorMessage);
      if(errorMessage !=null){
        this.status = 'error';
      }
    }
  );

      */
      this._userService.login(this.user).subscribe((event: HttpEvent<any>) => {
        console.log('EVENTO',event);
        switch (event.type){
          case HttpEventType.Sent:
            element.style.width = '0%';  
            console.log('Request sent!');
            element.style.width = '25%';
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header received!');
            element.style.width = '50%';
            break;
          case HttpEventType.DownloadProgress:
            //console.log(event.loaded);
            element.style.width = '75%';
            const kbLoaded = Math.round(100 * event.loaded);
            console.log(`Download in progress! ${ kbLoaded } Kb loaded`);
            break;
          case HttpEventType.Response:
            element.style.width = '100%';
            console.log('😺 Done!', event.body);
        }
      });

    


}
}
