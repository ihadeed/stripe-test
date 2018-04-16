import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

declare const cordova: any;

export function stripe() {
  return cordova.plugins.stripe;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private platform: Platform) {
    platform.ready()
      .then(() => {
        stripe().setPublishableKey('pk_test_o9rrGzeyADseN9nYqFc5LHae');
      });
  }

  getToken() {
    stripe().createCardToken({
      number: '4242424242424242',
      name: 'Ibby Hadeed',
      cvc: '424',
      expMonth: 5,
      expYear: 2020
    }, (token) => {
      console.log('Token is', token);
    });
  }

  testApplePay() {
    stripe().payWithApplePay({
      merchantId: 'merchant.ca.zyra',
      country: 'CA',
      currency: 'CAD',
      items: [
        {
          label: 'Test item',
          amount: 100
        }
      ]
    }, (token: any, callback: Function) => {
      console.log('Token is ', token);
      // send token to backend & process payment

      callback(true);
    });
  }

}
