import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  habilitado = true;

  constructor( private postsService: PostsService) {}

  ngOnInit() {
   
    this.siguientes();

    //subscribe que esta a la escucha y muestra el ultimo post sin recargar
    this.postsService.nuevoPost
    .subscribe( post => {

      this.posts.unshift( post );

    });
  }

  recargar( event ){
     
    this.posts = [];
    this.siguientes( event, true);
    this.habilitado = true;

    
  }

  siguientes( event?, pull: boolean = false ){

    this.postsService.getPosts( pull )
    .subscribe( resp => {

      console.log(resp);
      this.posts.push( ...resp.posts );

      if(event){
        event.target.complete();

        if( resp.posts.length === 0) {
          this.habilitado = false;
        }
      }
    
    });
    
  }
  

}
