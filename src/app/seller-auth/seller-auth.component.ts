import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, singUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})

export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) { }
  showLogin = false
  authError: string = ''
  singupMsg: string = ''
  ngOnInit(): void {
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
