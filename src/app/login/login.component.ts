import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../_service/login.service';
import { TOKEN_NAME } from '../_shared/var.constant';
import decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: string = "";
  password: string = "";
  form: FormGroup | undefined;

  message: string = "";
  error: string = "";



  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  logIn() {
    this.loginService.login(this.user, this.password).subscribe(
      data => {

        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);

        let tokenName = sessionStorage.getItem(TOKEN_NAME);

        let accessToken = JSON.parse(tokenName || '{}');


        const decodedToken: any = decode(accessToken.access_token);
        console.log(decodedToken);
        let rol = decodedToken.authorities[0];

        if (rol === 'ADMIN_USER' || rol === 'STANDARD_USER') {

          this.router.navigate(['exchange-rate']);
        }


      }, (err) => {
        if (err.status !== 401) {
          this.error = "Error de conexión";
        }
        if (err.status === 401 || err.status === 400) {
          this.error = "Credenciales incorrectas";
        }
      });
  }



}
