import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { singUp } from '../data-type';
import { login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService implements OnInit {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  isLoginFail=new EventEmitter<boolean>(false)

  ngOnInit(): void { }

  selerSinghUp(data: singUp) {
   this.http.post('http://localhost:3000/seller',data,
    {observe:'response'}).subscribe((result:any)=>{
      this.isSellerLoggedIn.next(true);
      if(result){
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home']);
    } 
    }) 
  }   
  userLogin(data:login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{ 

      if(result && result.body && result.body.length){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
      else{
        this.isLoginFail.emit(true)
      }
    });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
  
}
