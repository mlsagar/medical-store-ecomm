import { Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environment';

export enum CRUD_ACTION {
  PUT = 'PUT',
  PATCH = "PATCH",
  DELETE = "DELETE",
  GET = "GET",
  POST = "POST"
}

export interface UserCredentials {
  iat: number;
  _id: string;
  name: string;
  email: string;
  creditCard: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.BASE_URL;
  #isLoggedIn: WritableSignal<boolean> = signal(false);
  #userCredentials!: UserCredentials;
  #isSignUp: WritableSignal<boolean> = signal(false);
  userLocalStorageKey = environment.LOCAL_STORAGE.USER;

  set isLoggedIn(isLogin: boolean) {
    if (isLogin) {
      this.userToken = this.userToken;
    }
    this.#isLoggedIn.set(isLogin);
  }

  get isLoggedIn() {
    return this.#isLoggedIn();
  }

  set isItSignUp(isSignUp: boolean) {
    this.#isSignUp.set(isSignUp);
  }

  get isItSignUp() {
    return this.#isSignUp();
  }

  set userToken(token: string | null) {
    if (token) {
      const jwtDecodeCode: UserCredentials = jwtDecode(token);
      this.#userCredentials = jwtDecodeCode;
      localStorage.setItem(this.userLocalStorageKey, JSON.stringify({token}));
    }
  }

  get userToken() {
    const userValue = localStorage.getItem(this.userLocalStorageKey);

    if (userValue) {
      return JSON.parse(userValue).token;
    }
    return null;
  }

 set userCredentials(user: UserCredentials) {
  this.#userCredentials = user;
 }

 get userCredentials() {
  return this.#userCredentials;
 }

  constructor(
  ) { }
}
