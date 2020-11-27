import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalUserEditComponent } from '../modal-user-edit/modal-user-edit.component';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { ServicesService } from '../services/services.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  form: FormGroup;
  status = {
    data: null,
    loading: null,
    error: null
  };
  users: any;
  usersFilter: any;
  myModel: string;
  access: any;


  constructor(private router: Router,
              public modalController: ModalController,
              private service: ServicesService,
              public actionSheetController: ActionSheetController,
              public alertController: AlertController,
              public toastController: ToastController,
              private storage: Storage) {
    this.form = new FormGroup({
      phone: new FormControl('')
    });

  }
  ngOnInit() {
    this.storage.get('data').then((val) => {
      console.log('Your age is', val);
      this.access = val;
      console.log(val.user.data[0].id_condominio);
      this.getData(val.user.data[0].id_condominio);
    });
  }
  login(value) {
    console.log(value);
  }
  goToMain() {
    this.router.navigate(['/main']);

  }
  filterByCell(filterValue: any): void {
    console.log(filterValue);
    this.usersFilter = this.users;
    this.usersFilter = this.usersFilter.filter((item) => {
      console.log(item);
      console.log(item.telefono.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim()));
      return item.telefono.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim());
    });
  }
  getData(id) {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    setTimeout(() => {
      this.service.getUsers(id).toPromise().then((rsp: any) => {
        this.users = rsp.data;
        this.usersFilter = rsp.data;
        console.log(rsp);
        this.status.data = true;
        this.status.loading = false;
      }, err => {
        console.log(err);
        this.status.error = true;
        this.status.loading = false;
      });
    }, 3000);

  }
  tryAgain(){
    this.status.data = false;
    this.status.loading = false;
    this.status.error = false;
    this.getData(this.access.user.data[0].id_condominio);

  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalUserComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'data': this.users
      }
    });
    modal.onDidDismiss()
      .then((data: any) => {
        console.log(data.data.refresh);
        if (data.data.refresh) {
          this.tryAgain();
        }
      });
    return await modal.present();
  }
  async edit(user) {
    const modal = await this.modalController.create({
      component: ModalUserEditComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'data': user
      }
    });
    modal.onDidDismiss()
      .then((data: any) => {
        console.log(data.data.refresh);
        if (data.data.refresh) {
          this.tryAgain();
        }
      });
    return await modal.present();
  }

  async presentActionSheet(data) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.presentAlertConfirm(true, data);
          console.log('Delete clicked');
        }
      }, {
        text: 'Editar',
        icon: 'create-outline',
        handler: () => {
          this.edit(data);
          console.log('Share clicked');
        }
      }, {
        text: 'Resetear Hash',
        icon: 'refresh-outline',
        handler: () => {
          this.presentAlertConfirm(false, data);
          console.log('Play clicked');
        }
      }, {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlertConfirm(isRemove, data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: isRemove ? 'Eliminar' : 'Resetear Hash',
      message: '¿Está seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: isRemove ? 'Eliminar' : 'Resetear',
          handler: () => {
            if (isRemove) {
              this.remove(data);
            } else {
              this.resetHash(data);
            }
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  resetHash(data) {
    const user = {
      id: data.id,
      telefono: data.telefono,
      direccion: data.calle,
      numero: data.num_casa,
      condominio: data.id_condominio,
      hash: ''
    };
    console.log(user);
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    this.service.editUser(user).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.status.data = true;
      this.status.loading = false;
      this.openOk(false);
      this.tryAgain();

    }, err => {
      this.openError();
      console.log(err);
      this.status.error = true;
      this.status.loading = false;
    });

  }
  remove(data) {
    const id = {
      id: data.id
    };
    console.log(id);
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    this.service.removeUsers(data.id).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.status.data = true;
      this.status.loading = false;
      this.openOk(true);
      this.tryAgain();

    }, err => {
      this.openError();
      console.log(err);
      this.status.error = true;
      this.status.loading = false;
    });
    // console.log(data);
    // this.status.loading = true;
    // setTimeout(() => {
    //   this.tryAgain();
    //   this.openOk(true);

    // }, 2000);

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
  async openOk(isDelete) {
    const toast = await this.toastController.create({
      message: isDelete ? '<ion-icon name="checkmark-circle-outline"></ion-icon> Ok, eliminado correctamente' :
        '<ion-icon name="checkmark-circle-outline"></ion-icon> Ok, hash reseteado correctamente',
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
