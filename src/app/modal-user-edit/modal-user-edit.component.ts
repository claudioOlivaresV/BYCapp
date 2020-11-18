import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { ServicesService } from '../services/services.service';

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


  constructor(private modalCtrl: ModalController, public toastController: ToastController, private service: ServicesService) {

  }

  ngOnInit() {
    console.log(this.data);
    this.form = new FormGroup({
      phone: new FormControl({value: this.data.telefono, disabled: true}, [Validators.required, Validators.minLength(9),
        Validators.maxLength(9), Validators.pattern(/^([0-9])*$/)]),
      address: new FormControl(this.data.calle, Validators.required),
      number: new FormControl(this.data.num_casa, Validators.required),

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
    const user = {
      id: this.data.id,
      telefono: value.phone,
      direccion: value.address,
      numero: value.number,
      condominio: this.data.id_condominio,
      hash: this.data.hash
    };
    console.log(user);
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    this.service.editUser(user).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.status.data = true;
      this.status.loading = false;
      this.openOk();
      this.dismiss(true);

    }, err => {
      console.log(err);
      this.status.error = true;
      this.status.loading = false;
      this.openError();
      this.form.reset();
    });
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
