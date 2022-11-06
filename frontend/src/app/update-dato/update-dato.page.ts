import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { GeografiaService } from './../services/geografia.service';
import { PhotoService } from './../services/photo.service';


@Component({
  selector: 'app-update-dato',
  templateUrl: './update-dato.page.html',
  styleUrls: ['./update-dato.page.scss'],
})
export class UpdateDatoPage implements OnInit {

  capturedPhoto: string = "";
  isSubmitted: boolean = false;
  updateGeografiaForm: FormGroup;
  id: any;

  constructor(
    private geografiaService: GeografiaService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchUser(this.id);
    this.updateGeografiaForm = this.formBuilder.group({
      //id: ['id'],
      nombre: [''],
      poblacion: [''],
      
    })
  }

  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    // DECOMMENT:
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    // DECOMMENT:
    this.capturedPhoto = null;
  }


  fetchUser(id) {
    this.geografiaService.getComunidad(id).subscribe((data) => {
      this.updateGeografiaForm.setValue({
       // id: data['id'],
        nombre: data['nombre'],
        poblacion: data['poblacion'],
        
      });
    });
  }

 async onSubmit() {

  //   this.isSubmitted = true;
  //   if (!this.updateGeografiaForm.valid) {
  //     console.log('Please provide all the required values!')
  //     return false;
  //   } else {
  //     let blob = null;
  //     if (this.capturedPhoto != "") {
  //       const response = await fetch(this.capturedPhoto);
  //       blob = await response.blob();
  //     }

  //     this.geografiaService.updateComunidades(this.updateGeografiaForm.value, blob).subscribe(data => {
  //       console.log("Photo sent!");
  //       this.router.navigateByUrl("/home");
  //     })
  //   }
  // }





    if (!this.updateGeografiaForm.valid) {
      return false;
    } else {
      this.geografiaService.updateComunidades(this.id, this.updateGeografiaForm.value)
        .subscribe(() => {
          this.updateGeografiaForm.reset();
          this.router.navigate(['/home']);
        })
    }
  }

}