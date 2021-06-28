import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Currency } from "../_model/Currency";
import { HOST, TOKEN_NAME } from "../_shared/var.constant";


@Injectable({
    providedIn: "root",
})
export class CurrencyService {

    private url: string = `${HOST}/service/v1/currency`;

    constructor(private http: HttpClient) { }


    getAllCurrencies() {

        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME) || '{}').access_token;
        return this.http.get<Currency[]>(`${this.url}/all`, {
            headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
        });

    }

}