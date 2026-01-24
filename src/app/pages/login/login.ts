import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../core/constant/Global.constant';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj: any = {
    email: "",
    password: ""
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    
    this.http.post(environment.API_URL +"BatchUser/login", this.loginObj).subscribe({
      next: (res: any) => {
        
        localStorage.setItem(GlobalConstant.LOCAL_KEY_LOGIN, JSON.stringify(res.data));
        localStorage.setItem('batchToken', res.token)
        this.router.navigateByUrl('dashboard')
      },
      error: (err => {
        
        alert(err.error.message)
      })
    })
  }
}
