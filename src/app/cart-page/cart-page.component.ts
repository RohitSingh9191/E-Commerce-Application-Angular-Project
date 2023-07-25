import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary, product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  constructor(private product: ProductService, private route: Router) { }
  localCartData: any
  cartData: cart[] | undefined;
  noProductMsg = ''
  msgUserNotLogin=''
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  ngOnInit(): void {


    this.call()

  }
  call() {
    if (localStorage.getItem('user')) {

      this.product.currentCartData().subscribe((result) => {
        this.cartData = result;
        let amount = 0;

        result.forEach(item => {
          let productPrice = 0;
          if (item.quantity) {
            productPrice += (+item.price) * (+item.quantity)
          }
          amount += productPrice
        });

        if (amount != 0) {
          this.priceSummary.price = amount
          this.priceSummary.discount = (amount / 100) * 8;
          this.priceSummary.tax = amount / 10;
          this.priceSummary.delivery = 100;
        } else { this.noProductMsg = 'There is no Product add in Cart...' }

        let totalAmount = this.priceSummary.price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.delivery;
        this.priceSummary.total = totalAmount
      })

    }
    else {
      let data = localStorage.getItem('localCart')
      let userStore = localStorage.getItem('localCart')
      let userData = userStore && JSON.parse(userStore);
      console.log("cartData=", userData);
      this.cartData = userData

      let amount = 0
      userData.forEach((item: { quantity: string | number; price: string | number; }) => {
        let productPrice = 0;
        if (item.quantity) {
          productPrice += (+item.price) * (+item.quantity)
        }
        amount += productPrice
      });

      if (amount != 0) {
        this.priceSummary.price = amount
        this.priceSummary.discount = (amount / 100) * 8;
        this.priceSummary.tax = amount / 10;
        this.priceSummary.delivery = 100;
      } else { this.noProductMsg = 'There is no Product add in Cart...' }

      let totalAmount = this.priceSummary.price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.delivery;
      this.priceSummary.total = totalAmount
    }

  }

  removeTocart(id: any) {
    let cartData = localStorage.getItem('localCart');
    if (!localStorage.getItem('user')) {
      this.product.removeItemsFromCart(id)
      this.call()
    }
    else {
      this.cartData && this.product.removeToCartApi(id)
        .subscribe((result: any) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId)
          this.call()
        })
    }

  }

  checkOut(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/checkout'])
    }
    else{
      this.msgUserNotLogin='You need to Login...'
      this.call()
    }
    
  }
}
