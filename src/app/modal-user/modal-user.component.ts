import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})

export class ModalUserComponent implements OnInit {
  users: any[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    },
    {
      id: 3,
      first: 'Charlie',
      last: 'Rosenburg',
    }
  ];
  form: FormGroup;
  status = {
    data: null,
    loading: null,
    error: null
  };
  compareWith;
  idCondominio: number;
  access: any = [];
  @Input() data: any;


  constructor(private modalCtrl: ModalController, public toastController: ToastController, private storage: Storage, 
              private service: ServicesService) {
    this.form = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.minLength(9),
      Validators.maxLength(9), Validators.pattern(/^([0-9])*$/)]),
      address: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),

    });
  }

  ngOnInit() {
    console.log(this.data);
    this.data.forEach(element => {
      const existe = this.access.includes(element.calle);
      console.log(existe);
      console.log(element.calle);
      if (!existe) {
        this.access.push(element.calle);

      }
    });
    this.storage.get('data').then((val) => {
      this.idCondominio = val.user.data[0].id_condominio;
    });

   }
  dismiss(status) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      refresh: status
    });
  }
  add(value) {
    console.log(value);
    this.status.loading = true;
    const user = {
      telefono: value.phone,
      direccion: value.address,
      numero: value.number,
      condominio: this.idCondominio
    };
    console.log(user);
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    this.service.addUsers(user).toPromise().then((rsp: any) => {
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
  compareWithFn = (o1, o2) => {
    const list =  o1 && o2 ? o1.id === o2.id : o1 === o2;
    this.compareWith = list;
  }



}
