import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  delletMsg:undefined|string=''
  constructor(private prouct:ProductService){}
  
  productList:undefined |product[];
  ngOnInit(): void {
    this.call()
    }
    deleteProduct(id:number){  
      this.prouct.deleteProduct(id).subscribe((result)=>{
        if(result){
          this.delletMsg="Product Deleted successfully"
        }this.call()
      });
      this.call()
      setTimeout(() => this.delletMsg=undefined, 3000);  
      
    }
   call(){
    this.prouct.productList().subscribe((result)=>{     
      this.productList=result
    })
   } 

}
