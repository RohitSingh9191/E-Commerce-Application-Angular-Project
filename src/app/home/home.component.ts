import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  popularProduct: product[] | undefined
  allProduct: product[] | undefined

  removeCart:boolean=false
  constructor(private product: ProductService,private user:UserService) { }

  ngOnInit(): void {
  //  console.log(this.removeCart)
    this.product.popularProducts().subscribe((data) => {
      this.popularProduct = data
      // console.log(data)
      this.product.getAllProducts().subscribe((data) => {
        this.allProduct = data;
      })
    })
  }

  
}
