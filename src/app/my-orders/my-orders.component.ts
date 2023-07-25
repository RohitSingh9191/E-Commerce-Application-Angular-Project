import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  constructor(private product:ProductService){}
  orderData:order[]|undefined

  ngOnInit(): void {
     this.callCartList();
  }
  callCartList(){
    this.product.orderList().subscribe((result)=>{   
        this.orderData=result      
  })
  }
  cancleOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.callCartList();
    })
  }
}
