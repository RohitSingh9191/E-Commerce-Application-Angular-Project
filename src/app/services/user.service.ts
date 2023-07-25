import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, singUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;

      isUserLogedIn = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  isLoginFail = new EventEmitter<boolean>(false)

  singUp(value: singUp) {
    this.http.post('http://localhost:3000/user', value, { observe: 'response' }).subscribe((result) => {
      this.isUserLogedIn.next(true)
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/'])
      }
    })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }

  }

  userLogin(data: login) {
    this.http.get<singUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {

      if (result && result.body.length) {
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        this.router.navigate(['/'])
        this.isLoginFail.emit(false)
      } else {
        
        this.isLoginFail.emit(true)
      }
    })
  }
}
