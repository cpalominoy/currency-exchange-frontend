import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Currency } from '../_model/Currency';
import { CurrencyService } from '../_service/currency.service';
import { ExchangeRateService } from '../_service/exchangeRate.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {


  currencies: Currency[] = [];
  amountSource: number = 0;
  amountTarget: number = 0;
  sourceSelect: string = "";
  targetSelect: string = "";
  error: string = "";

  exchangeRateForm: FormGroup;

  constructor(private currencyService: CurrencyService,
    private exchangeRateService: ExchangeRateService) {

    this.exchangeRateForm = new FormGroup({
      amountSource: new FormControl(null),
      amountTarget: new FormControl(null),
      sourceSelect: new FormControl(null),
      targetSelect: new FormControl(null),
    })

    console.log(this.exchangeRateForm.get('targetSelect')?.value);

  }

  ngOnInit(): void {
    this.getListCurrency();
  }




  getListCurrency() {
    this.currencyService.getAllCurrencies().subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.currencies = data;
      }
    );
  }

  calculateExchangeRate() {

    let amount = this.exchangeRateForm.get('amountSource')?.value;
    let source = this.exchangeRateForm.get('sourceSelect')?.value;
    let target = this.exchangeRateForm.get('targetSelect')?.value;


    this.exchangeRateService.getCurrencyExchangeRate(source, target, amount).subscribe(
      data => {

        console.log(JSON.stringify(data));
        this.exchangeRateForm.controls['amountTarget'].setValue(data.convertedAmount);
      },
      (err) => {

        this.error = err.error.message;
      }
    );

  }

}
