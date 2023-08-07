import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { PopupboxService } from '../services/popupbox.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  delletMsg:undefined|string=''
    
  id:number|undefined
  constructor(private prouct:ProductService, private popup:PopupboxService){

    this.popup.deleteProductEvent().subscribe((result)=>{
        if(result==true&&this.id){
          this.deleteProduct(this.id);
        }
    })
  }

  productList:undefined |product[];
  ngOnInit(): void {
    this.call()
    }

    deletePopup(id:number){
        this.id=id;
      this.popup.productPopup();
    }

    deleteProduct(id:any){  
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
