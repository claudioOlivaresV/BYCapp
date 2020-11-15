import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    this.form = new FormGroup({
      phone: new FormControl('', [ Validators.required, Validators.minLength(9),
                                   Validators.maxLength(9), Validators.pattern(/^([0-9])*$/) ])
    });
  }

  ngOnInit() {
    this.status.data = false;
    this.status.loading = false;
    this.status.error = false;
  }
  login(value){
    console.log(value);
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    setTimeout(() => {
    //   // if (values.user === 'test@gmail.com' && values.password === '123') {
        this.status.loading = false;
        this.status.data = true;
    //   //   localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/main']);
    //     this.router.navigate(['/main']);
    //   // } else {
    //   //   this.status.loading = false;
    //   //   this.status.error = true;
    //   // }
    }, 3000);
  }

}
