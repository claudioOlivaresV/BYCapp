import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-user-edit',
  templateUrl: './modal-user-edit.component.html',
  styleUrls: ['./modal-user-edit.component.scss'],
})
export class ModalUserEditComponent implements OnInit {
  form: FormGroup;
  status = {
    data: null,
    loading: null,
    error: null
  };
  @Input() data: any;


  constructor(private modalCtrl: ModalController, public toastController: ToastController) {

  }

  ngOnInit() {
    console.log(this.data);
    this.form = new FormGroup({
      phone: new FormControl(this.data.numero, [Validators.required, Validators.minLength(9),
        Validators.maxLength(9), Validators.pattern(/^([0-9])*$/)]),
      address: new FormControl(this.data.direccion, Validators.required),
      number: new FormControl(this.data.numeroCasa, Validators.required),

    });
  }
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
      message: '<ion-icon name="checkmark-circle-outline"></ion-icon> Ok, usuario editado correctamente',
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
