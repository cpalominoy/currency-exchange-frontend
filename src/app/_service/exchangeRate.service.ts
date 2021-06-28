import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ExchangeRate } from "../_model/exchangeRate";
import { HOST, TOKEN_NAME } from "../_shared/var.constant";

@Injectable({
    providedIn: "root",
})
export class ExchangeRateService {


    private url: string = `${HOST}/service/v1/exchange-rate`;

    constructor(private http: HttpClient) { }


    getCurrencyExchangeRate(source: string, target: string, amount: number) {

        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME) || '{}').access_token;
        return this.http.get<ExchangeRate>(`${this.url}/converter?source=${source}&target=${target}&amount=${amount}`, {
            headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
        });

    }

}