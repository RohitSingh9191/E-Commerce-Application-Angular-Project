import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { cart, login, product, singUp } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true
  authError: any

  constructor(private user: UserService, private product: ProductService) { }
  ngOnInit(): void {
    this.user.userAuthReload();
  }

  singUp(value: singUp) {
    this.user.singUp(value);
  }

  opneLogin() {
    this.showLogin = true
  }
  opneSingup() {
    this.showLogin = false  
  } 

  login(value: login) {
    this.user.userLogin(value);
    this.user.isLoginFail.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is not correct';
      }
      else {
        this.localCartToRemotecart();
      }
    })
  }

  localCartToRemotecart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDatalist: product[] = JSON.parse(data);


      cartDatalist.forEach((prduct: product, index) => {
        let cartData: cart = {
          ...prduct,
          productId: prduct.id,
          userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.userAddToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("Item store in DB");
            }
          });
          if (cartDatalist.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);

  }
}
