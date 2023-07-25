import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private product:ProductService , private route:ActivatedRoute,private router:Router){}
  productDetails:undefined|product[]
  noDataPersent:string='';
  word:string|undefined|null

  ngOnInit(): void {
    this.product.productName.subscribe((result)=>{
      this.word=result
      this.noDataPersent=''
      this.Call();
    })
    this.Call();
   
  }

  Call(){
    // console.log("call searg page")
    this.word=this.route.snapshot.paramMap.get('word'); 
     console.log('word = ',this.word)

    this.word && this.product.searchProducts(this.word).subscribe((result)=>{
      this.productDetails=result
      //console.log(result)
      if(result.length==0){
        this.noDataPersent='Not Found Any Product...';
      }
     })
  }
}
