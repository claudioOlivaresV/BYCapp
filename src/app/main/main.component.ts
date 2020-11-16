import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  status = {
    loading: true,
  };

  access: any;

  constructor(private router: Router, private storage: Storage, public toastController: ToastController) { }

  ngOnInit() {
    this.status.loading = true;
    this.storage.get('isLoggedin').then((val) => {
      console.log('Your age is', val);
    });
    this.storage.get('data').then((val) => {
      console.log('Your age is', val);
      this.access = val;
    });
    setTimeout(() => {
      this.status.loading = false;
    }, 500);

  }
  goToAdmin(){
    console.log('click');
    this.router.navigate(['/tabs/tab1']);
  }
  logout(){
    this.storage.remove('isLoggedin');
    this.router.navigate(['/']);
  }
  open2(){
    this.openError();
  }
  open3(){
    this.status.loading = true;
    setTimeout(() => {
      this.openOk();
      this.status.loading = false;
    }, 3000);
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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
      message: '<ion-icon name="checkmark-circle-outline"></ion-icon> Ok, acceso se está abriendo',
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
