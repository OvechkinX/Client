import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  model: User = new User();

  username = new FormControl();
  password = new FormControl();

  constructor(private authService: AuthService, private router: Router, private alertifyService: AlertifyService) {}

  ngOnInit() {
  }


  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('Zalogowano pomyślnie');
      const role = this.authService.getRole();
      if (role === 'Admin') {
        this.router.navigate(['/admin']);
      }
      if (role === 'Loader') {
        this.router.navigate(['/user-loader']);
      }
      if (role === 'Transport') {
        this.router.navigate(['/user-transport']);
      }
    }, error => {
      this.alertifyService.error('Niepoprawna nazwa użytkownika lub hasło');
      this.username.setValue('');
      this.password.setValue('');
    });
  }

}
