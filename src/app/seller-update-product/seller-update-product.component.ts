import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { SellerHomeComponent } from '../seller-home/seller-home.component';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  addPrductMesg: string | undefined
  constructor(private route: ActivatedRoute, private router:Router ,private product: ProductService , private list:RouterModule) { }
  productData:undefined|product;

  productId:any
  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('id')
    // console.log(this.productId )
    this.productId && this.product.getProduct(this.productId).subscribe((data) => {
      this.productData=data
     })
  }
  
  submint(data:any){
    this.product.updateProduct(data,this.productId).subscribe((result)=>{
      //show masseg to user seller
      if(result){
        this.addPrductMesg='Product is successfully updated'
      }   
      //after 5 ses msg is deleted
      setTimeout(() => this.addPrductMesg=undefined, 2000);  
      
    }) 
    setTimeout(()=>this.router.navigate(['seller-home']),1500)
  }

}
