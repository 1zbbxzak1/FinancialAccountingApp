import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "./services/auth/auth.service";
import {IdentityService} from "./services/auth/identity.service";
import {CardService} from "./services/card/card.service";
import {CardManagerService} from "./services/card/card.manager.service";
import {OperationService} from "./services/operation/operation.service";
import {OperationManagerService} from "./services/operation/operation.manager.service";
import {PaymentService} from "./services/payment/payment.service";
import {PaymentManagerService} from "./services/payment/payment.manager.service";
import {UserService} from "./services/user/user.service";
import {UserManagerService} from "./services/user/user.manager.service";
import {AuthGuard} from "./guards/auth.guard";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
    ],
    providers: [
        AuthGuard,
        AuthService,
        IdentityService,
        CardService,
        CardManagerService,
        OperationService,
        OperationManagerService,
        PaymentService,
        PaymentManagerService,
        UserService,
        UserManagerService,
    ]
})
export class DataModule {
}
