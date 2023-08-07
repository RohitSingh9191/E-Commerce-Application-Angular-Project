import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { login, singUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})

export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService) { }
  showLogin = false
  authError: string = ''
  singupMsg: string = ''

  ngOnInit(): void {
    console.log("auth load")
    this.seller.reloadSeller();
  }

  singUp(data: singUp) {
    this.seller.selerSinghUp(data);
  }

  login(data: login): void {
    //console.warn(data)
    this.seller.userLogin(data);
    this.seller.isLoginFail.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is not correct';
        }
      })
  }

  opneLogin() {
    this.showLogin = false
  }
  opneSingup() {
    this.showLogin = true
  }
}
