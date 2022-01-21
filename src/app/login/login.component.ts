import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import jwtDecode, { JwtDecodeOptions } from 'jwt-decode';
import { state } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:any={
    email:null,
    password:null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage =''
  roles:string[] =[];
  constructor(private authService :AuthService, private tokenStorage:TokenStorageService,  private router: Router) { }

  ngOnInit(): void {

    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['home']);
    };
  }


  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        console.log("login success data ", data)
        let decodedToken = this.getUserIdFromToken(data.access)
        this.tokenStorage.saveToken(data.access);
        this.tokenStorage.saveUser(decodedToken.user_id);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['home']);
        //this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  getUserIdFromToken(token:string): any {
    try
    {
     
      return  jwtDecode(token);
    }
    catch(Error)
    {
      return null;
    }
   
  }

}
