import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'exchange-rate', component: ExchangeRateComponent },
  { path: '', component: LoginComponent }

]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
