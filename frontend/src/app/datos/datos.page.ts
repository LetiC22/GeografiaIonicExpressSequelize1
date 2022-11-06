import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GeografiaService } from './../services/geografia.service';
import { PhotoService } from './../services/photo.service';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  geografiaForm: FormGroup;
  capturedPhoto: string = "";
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private photoService: PhotoService,
    private geografiaService: GeografiaService    
  ) {
    this.geografiaForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      poblacion: ['',[Validators.required]]
   
    })
  }

  ngOnInit() { 

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

  async submitForm() {
    // DECOMMENT:
    this.isSubmitted = true;
    if (!this.geografiaForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.geografiaService.createComunidades(this.geografiaForm.value, blob).subscribe(data => {
        console.log("Photo sent!");
        this.router.navigateByUrl("/home");
      })
    }
  }




  // onSubmit() {
  //   if (!this.geografiaForm.valid) {
  //     return false;
  //   } else {
  //     this.geografiaService.updateComunidades(this.geografiaForm.value)
  //       .subscribe((response) => {
  //         this.zone.run(() => {
  //           this.geografiaForm.reset();
  //           this.router.navigate(['/home']);
  //         })
  //       });
  //   }
  // }









}


