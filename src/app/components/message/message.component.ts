import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import Swal from'sweetalert2';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [MessageService]
})
export class MessageComponent implements OnInit {
  correo: string='';
  constructor(public _MessageService: MessageService) { }

  ngOnInit() {
  }

  contactForm(form) {
    this._MessageService.sendMessage(form).subscribe(() => {
      Swal.fire("Formulario de contacto", "Mensaje enviado correctamente", 'success')
    });
    }

}
