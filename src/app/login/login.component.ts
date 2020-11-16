import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ServicesService } from '../services/services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  status = {
    data: null,
    loading: null,
    error: null
  };
  isLoggin = false;

  constructor(private router: Router, private storage: Storage, private service: ServicesService) {
    this.form = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.minLength(9),
      Validators.maxLength(9), Validators.pattern(/^([0-9])*$/)])
    });
  }

  ngOnInit() {
    this.status.data = false;
    this.status.loading = false;
    this.status.error = false;
    this.storage.get('isLoggedin').then((val) => {
      if (val) {
        this.isLoggin = val;
        this.router.navigate(['/main']);
      }
      console.log('Your age is', val);
    });
  }
  ionViewWillEnter(){
    console.log('modantado');
    this.storage.get('isLoggedin').then((val) => {
      if (val) {
        this.isLoggin = val;
        this.router.navigate(['/main']);
      }
      console.log('Your age is', val);
    });
    
  }

  login(value) {
    const hash = Math.floor(Math.random() * (100000 + 1));
    console.log(value);
    const user = {
      telefono: '931994635',
      hash : '1234'
    };
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    this.service.login(user).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.status.data = true;
      this.status.loading = false;
      this.storage.set('isLoggedin', true);
      this.storage.set('data', rsp);
      this.router.navigate(['/main']);
    }, err => {
      console.log(err);
      this.form.reset();
      this.status.error = true;
      this.status.loading = false;
    });
  }

}
