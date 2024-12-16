import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgOtpInputModule } from 'ng-otp-input';

import { LoginComponent } from './cvs247/auth/login/login.component';
import { ManagerComponent } from './cvs247/auth/manager/manager.component';
import { OtpVerificationComponent } from './cvs247/auth/otp-verification/otp-verification.component';
import { RegistrationComponent } from './cvs247/auth/registration/registration.component';
import { HomepageComponent } from './cvs247/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CVSPharmacyComponent } from './cvsPharmacy/cvspharmacy/cvspharmacy.component';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { RegistrationService } from './services/registration.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { UserComponent } from './cvs247/profile/user/user.component';
import { PersonalInfoComponent } from './cvs247/profile/personal-info/personal-info.component';
import { PurchaseHistoryComponent } from './cvs247/profile/purchase-history/purchase-history.component';
import { AddressComponent } from './cvs247/profile/address/address.component';
import { PersonalInfoService } from './cvs247/profile/services/personal-info.service';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';

import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";

import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './cvs247/header/header.component';
import { FooterComponent } from './cvs247/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './cvsPharmacy/cart/cart.component';
import { CheckoutComponent } from './cvsPharmacy/checkout/checkout.component';
import { AppointmentComponent } from './cvsAppointmentBooking/appointment/appointment.component';
import { TickAnimationComponent } from './cvsAppointmentBooking/appointment/tick-animation/tick-animation.component';
import { DoctorCardComponent } from './cvsAppointmentBooking/doctors/doctor-card/doctor-card.component';
import { DoctorsComponent } from './cvsAppointmentBooking/doctors/doctors.component';
import { SpecialitiesComponent } from './cvsAppointmentBooking/specialities/specialities.component';
import { BookAppointmentComponent } from './cvsAppointmentBooking/book-appointment/book-appointment.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    LoginComponent,
    OtpVerificationComponent,
    RegistrationComponent,
    ManagerComponent,
    CVSPharmacyComponent,
    BookAppointmentComponent,
    AddressComponent,
    UserComponent,
    PersonalInfoComponent,
    PurchaseHistoryComponent,
    CartComponent,
    CheckoutComponent,
    SpecialitiesComponent,
    DoctorsComponent,
    DoctorCardComponent,
    AppointmentComponent,
    TickAnimationComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgOtpInputModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [PersonalInfoService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
