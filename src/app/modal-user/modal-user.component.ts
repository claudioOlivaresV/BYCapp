import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent implements OnInit {
  form: FormGroup;
  status = {
    data: null,
    loading: null,
    error: null
  };

  constructor(private modalCtrl: ModalController, public toastController: ToastController) {
    this.form = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.minLength(9),
        Validators.maxLength(9), Validators.pattern(/^([0-9])*$/)]),
      address: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),

    });
   }

  ngOnInit() {}
  dismiss(status) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      refresh: status
    });
  }
  add(value){
    console.log(value);
    this.status.loading = true;
    setTimeout(() => {
      this.status.loading = false;
      this.openOk();
      this.dismiss(true);

    }, 3000);
  }
  async openError() {
    const toast = await this.toastController.create({
      message: '<ion-icon name="alert-circle-outline"></ion-icon> Error, vuelva a intentarlo',
      // position: 'top',
      duration: 10000,
      color: 'danger',
      buttons: [
       {
          role: 'cancel',
          icon: 'close-outline',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async openOk() {
    const toast = await this.toastController.create({
      message: '<ion-icon name="checkmark-circle-outline"></ion-icon> Ok, usuario agregado',
      // position: 'top',
      duration: 10000,
      color: 'success',
      buttons: [
       {
          role: 'cancel',
          icon: 'close-outline',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
