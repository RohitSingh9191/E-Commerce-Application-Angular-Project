import { EventEmitter, Injectable } from '@angular/core';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { Subject , Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupboxService {
  
  constructor( ) { }
  private subject=new Subject<any>(); 
  private subject2=new Subject<any>(); 

//User Logout
  openPopUp(){
   this.subject.next(true);
  }
  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }

  ueserLogout(){
    this.subject2.next(true);
  }
  
  userLogoutEvent(){
    return this.subject2.asObservable();
    
  }

  private sellerpopup=new Subject<any>();
  private sellerpopupLogout=new Subject<any>();


//Seller logout

sellerOpenPopUp(){
  this.sellerpopup.next(true);
}
sellerGetClickEvent():Observable<any>{
  return this.sellerpopup.asObservable();
}

sellerLogout(){
      this.sellerpopupLogout.next(true);
}

sellerLogoutEvenr(){
  return this.sellerpopupLogout.asObservable();
}

//Product delete
  private product=new Subject<any>();
  private deleteProductList=new Subject<any>();
 
productPopup(){
  this.product.next(true);
}

productpopupEvent(){
  return this.product.asObservable();
}
deleteProduct(){
      this.deleteProductList.next(true);
}
deleteProductEvent(){
  return this.deleteProductList.asObservable();
}

}

