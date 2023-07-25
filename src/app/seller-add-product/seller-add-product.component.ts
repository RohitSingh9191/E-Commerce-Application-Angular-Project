import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  constructor(private product:ProductService, private router:Router){}
  addPrductMesg:string|undefined

  submint(data:product){
    this.product.addProduct(data).subscribe((result)=>{
      //console.log(result)
      //show masseg to user seller
      if(result){
        this.addPrductMesg='Product is successfully added'
      }
      
      //after 5 ses msg is deleted
      setTimeout(() => this.addPrductMesg=undefined, 3000);     
    })  
  }
}
