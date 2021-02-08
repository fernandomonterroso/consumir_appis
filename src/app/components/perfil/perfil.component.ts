import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UserService, UploadService]
})
export class PerfilComponent implements OnInit {
  public identity;
  public token;
  public url;
  public status: string;
  public user: User;

  constructor(
    private _route: Router,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

  editUser() {
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error'
        } else {
          this.status = 'ok'

          sessionStorage.setItem('identity', JSON.stringify(this.user))
          this.identity = this.user

          //SUBIR IMAGEN DE USER
          this._uploadService.makeFileRequest(this.url + 'subir-imagen-usuario/' + this.user._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              console.table(result);
              this.user.image = result.user.image;
              sessionStorage.setItem('identity', JSON.stringify(this.user));
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
