import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor( private usuarioService: UsuarioService,
                private uiService: UiServiceService,
                private postService: PostsService ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    
  }

  logout(){
    this.usuarioService.logout();

    this.postService.paginaPosts = 0;
  }

  async actualizar( fActualizar: NgForm ){

    if( fActualizar.invalid ){ return; }

    const actualizado = await this.usuarioService.actualizarUsuario( this.usuario );

    if(actualizado){
      this.uiService.presentToast('Registro actualizado');
    }else{
      this.uiService.presentToast('No se pudo actualizar');
    }

  }

}
