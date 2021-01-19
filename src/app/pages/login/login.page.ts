import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,AfterViewInit{


loginUser = {
  email: 'test2@gmail.com',
  password: 'test2'
};

registerUser: Usuario = {
  email: 'test3@gmail.com',
  password: 'test3',
  nombre: 'test3',
  avatar: 'av-1.png'

};

@ViewChild('slidesMain') slides: IonSlides;


  constructor( private usuarioService: UsuarioService,
                private navCtrl: NavController,
                private uiService: UiServiceService ) { }

  ngOnInit() {

  }
  ngAfterViewInit(){
    this.slides.lockSwipes(true);

  }


  async login( fLogin: NgForm ) {

    if( fLogin.invalid ){ return;}

     const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password);
    
    if( valido ){
      //navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1',{ animated: true } );

    }else{
      //usuario/contraseña incorrectos
      this.uiService.alertaInformativa('Usuario y Contraseña incorrectos');

    }
 
 
  }

   async registro( fRegistro: NgForm ) {

    if( fRegistro.invalid ){ return;}

    const valido = await this.usuarioService.registro( this.registerUser );
    
    if( valido ){
      //navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1',{ animated: true } );

    }else{
      //usuario/contraseña incorrectos
      this.uiService.alertaInformativa('Correo electronico ya existe ');

    }

  }

  

  mostrarRegistro(){

    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }
  mostrarLogin(){

    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);

  }

  
  
}
