import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from  '@angular/fire/compat/auth';
import { RegistrationRequestModelInterface } from "../request-models/auth/registration.request-model.interface";
import { LoginRequestModelInterface } from "../request-models/auth/login.request-model.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dataBase = inject(AngularFireAuth)

  public registerWithEmailAndPassword(user: RegistrationRequestModelInterface) {
    return this.dataBase.createUserWithEmailAndPassword(user.email, user.password);
  }

  public loginWithEmailAndPassword(user: LoginRequestModelInterface) {
    return this.dataBase.signInWithEmailAndPassword(user.email, user.password);
  }
}
