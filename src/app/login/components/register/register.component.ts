import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  username = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  role = new FormControl('');

  model: User = new User();
  errors: any[] = [];


  constructor(private authService: AuthService, private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit() {

  }


  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertifyService.success('Rejestracja pomyślna');
      this.router.navigate(['./signin']);
    }, error => {
      const err: HttpErrorResponse = error.error.errors;

      try { this.errors.push(error.error.errors.Username[0]); } catch (error) { }
      try { this.errors.push(error.error.errors.FirstName[0]); } catch (error) { }
      try { this.errors.push(error.error.errors.LastName[0]); } catch (error) { }
      try { this.errors.push(error.error.errors.Email[0]); } catch (error) { }
      try { this.errors.push(error.error.errors.Password[0]); } catch (error) { }
      try { this.errors.push(error.error.errors.Role[0]); } catch (error) { }


      for (const e of this.errors) {
        this.alertifyService.error(e);
      }

      this.errors = [];
      this.username.setValue('');
      this.firstName.setValue('');
      this.lastName.setValue('');
      this.email.setValue('');
      this.password.setValue('');
      this.role.setValue('');
    });
  }

}
