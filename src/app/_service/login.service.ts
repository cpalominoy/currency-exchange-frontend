import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST, TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, TOKEN_NAME } from './../_shared/var.constant';
import * as decode from 'jwt-decode';


@Injectable({
    providedIn: "root",
})
export class LoginService {

    private url: string = `${HOST}/oauth/token`;

    constructor(private http: HttpClient, private router: Router) {
    }

    login(user: string, password: string) {
        const body = `grant_type=password&username=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`;

        return this.http.post(this.url, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
        });

    }


    loggedIn() {
        let token = sessionStorage.getItem(TOKEN_NAME);
        return token != null;
    }

    signOff() {
        sessionStorage.clear();
        this.router.navigate(['login']);
    }



}