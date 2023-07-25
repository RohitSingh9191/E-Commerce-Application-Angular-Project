import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],

})
export class ProductDetailsComponent implements OnInit {
  productData:undefined | product;
  productQuantity:number=1;
  removeCart=false;
  cartData:product|undefined;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);

    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData= result;
      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId=== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
          console.log(result)
  
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
        
           if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
       }
        });
        this.product.getCartList(userId);
      }      
    })
    
  }
  //-------------------------------------------------
  minus() {
    if (this.productQuantity > 1) {
      this.productQuantity -= 1
    }
  }
  plush() {
    return this.productQuantity += 1
  }

  addProduct() {
    this.removeCart = true;
    if (this.productData) {
      this.productData.quantity = this.productQuantity

      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData)
      }
      else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id;
        let cartData: cart = { ...this.productData, userId, productId: this.productData.id }

        delete cartData.id
        this.product.userAddToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true
          }
        })

      }
    }
  }

  removeTocart(id: any) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemsFromCart(id)
      //this.removeCart = false;
    }
    {
      console.warn("cartData", this.cartData);
      
      this.cartData && this.product.removeToCartApi(this.cartData.id)
      .subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId)
      })
    }
    this.removeCart=false
  }

  }
