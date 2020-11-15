import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalUserComponent } from '../modal-user/modal-user.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  form: FormGroup;

  constructor(private router: Router, public modalController: ModalController) {
    this.form = new FormGroup({
      phone: new FormControl('')
    });

  }
  login(value){
    console.log(value);
  }
  goToMain(){
    this.router.navigate(['/main']);

  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalUserComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
