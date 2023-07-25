import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private product:ProductService,private route:Router){}
  totalPrice:number|undefined
  cartData:cart[]|undefined
  orderMsg:string|undefined
ngOnInit(): void {
      this.product.currentCartData().subscribe((result)=>{
      let price =0;
      this.cartData=result;
      result.forEach(item => {
        let productPrice=0;
        if(item.quantity){
         productPrice+=(+item.price)*(+item.quantity)
        }
        price+=productPrice
      });

      this.totalPrice=price+(price/10)+100-((price/100*8))
})
}
  oderNow(data:{email:string,address:string,contact:string}){
    let user = localStorage.getItem('user')
    let userId=user && JSON.parse(user).id;
    if(this.totalPrice){
     let orderData:order={
      ...data,
      totalPrice:this.totalPrice,
      userId,
      id:undefined
     }

     this.cartData?.forEach(items => {
        setTimeout(() => {
         items.id && this.product.deleteCartItems(items.id)
        }, 700);
     });

     this.product.orderNow(orderData).subscribe((result)=>{
      if(result){
        this.orderMsg='Your order has been successfully placed'
        setTimeout(() => {
          this.route.navigate(['/my-order'])
          this.orderMsg=undefined
        }, 2000);
      }
     })
    }
  }
}
