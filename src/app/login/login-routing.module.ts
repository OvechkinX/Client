import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';



const  routes: Routes  = [
{
path:  '',
component: LoginComponent,
children: [
        {
        path:  '',
        component:  SigninComponent
        },
        {
        path:  'signin',
        component:  SigninComponent
        },
        {
        path:  'register',
        component:  RegisterComponent
        }
]
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  LoginRoutingModule { }
