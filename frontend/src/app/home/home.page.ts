import { Component, OnInit } from '@angular/core';
import { GeografiaService } from '../services/geografia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

comunidades: any =[];



    constructor(private geografiaService: GeografiaService, private router : Router) {}
   


    ngOnInit() {

      
      
      this.getAllComunidades();
    }

    getAllComunidades(){
      this.geografiaService.getGeografia().subscribe(response => {
      this.comunidades = response;
      });
    }

    removeComunidades(id){
      this.geografiaService.deleteComunidades(id).subscribe(data =>{
      this.getAllComunidades();
  
      });
    }

  // DECOMMENT:
   addComunidades(){
    this.router.navigateByUrl("/datos");
  }

}
