import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { ServicesService } from '../services/services.service';

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
  myModel:string;


  constructor(private router: Router, public modalController: ModalController,
    private service: ServicesService, public actionSheetController: ActionSheetController, public alertController: AlertController) {
    this.form = new FormGroup({
      phone: new FormControl('')
    });

  }
  ngOnInit(){

    this.getData();
  }
  login(value){
    console.log(value);
  }
  goToMain(){
    this.router.navigate(['/main']);

  }
  filterByCell(filterValue: any): void {
    console.log(filterValue);
    this.usersFilter = this.users;
    this.usersFilter = this.usersFilter.filter( (item) => {
      console.log(item);
      console.log(item.numero.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim()));
      return item.numero.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim());
      
  });
  }
  getData(){
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    setTimeout(() => {
      this.service.getUsers().toPromise().then((rsp: any) => {
        this.users = rsp;
        this.usersFilter = rsp;
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
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalUserComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.presentAlertConfirm();
          console.log('Delete clicked');
        }
      }, {
        text: 'Editar',
        icon: 'create-outline',
        handler: () => {
          this.presentModal();
          console.log('Share clicked');
        }
      }, {
        text: 'Resetear Hash',
        icon: 'refresh-outline',
        handler: () => {
          this.presentAlertConfirm();
          console.log('Play clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
