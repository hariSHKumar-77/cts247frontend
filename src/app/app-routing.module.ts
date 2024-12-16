import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cvs247/auth/login/login.component';
import { ManagerComponent } from './cvs247/auth/manager/manager.component';
import { OtpVerificationComponent } from './cvs247/auth/otp-verification/otp-verification.component';
import { RegistrationComponent } from './cvs247/auth/registration/registration.component';
import { HomepageComponent } from './cvs247/homepage/homepage.component';
import { AddressComponent } from './cvs247/profile/address/address.component';
import { PersonalInfoComponent } from './cvs247/profile/personal-info/personal-info.component';
import { PurchaseHistoryComponent } from './cvs247/profile/purchase-history/purchase-history.component';
import { AppointmentComponent } from './cvsAppointmentBooking/appointment/appointment.component';
import { BookAppointmentComponent } from './cvsAppointmentBooking/book-appointment/book-appointment.component';
import { DoctorsComponent } from './cvsAppointmentBooking/doctors/doctors.component';
import { SpecialitiesComponent } from './cvsAppointmentBooking/specialities/specialities.component';
import { CartComponent } from './cvsPharmacy/cart/cart.component';
import { CheckoutComponent } from './cvsPharmacy/checkout/checkout.component';
import { CVSPharmacyComponent } from './cvsPharmacy/cvspharmacy/cvspharmacy.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [


  { path: '', component: HomepageComponent },
  { path: 'CVSPharmacy', component: CVSPharmacyComponent ,canActivate: [AuthGuard]},
  { path: 'BookAppointment', component: BookAppointmentComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  { path: 'manager', component: ManagerComponent ,canActivate: [AuthGuard]},
  { path: 'personal-info', component: PersonalInfoComponent ,canActivate: [AuthGuard]},
  { path: 'purchaseHistory', component: PurchaseHistoryComponent ,canActivate: [AuthGuard]},
  { path: 'addressBook', component: AddressComponent ,canActivate: [AuthGuard]},
  { path: 'CVSPharmacy/cart', component: CartComponent ,canActivate: [AuthGuard]},
  { path:'CVSPharmacy/checkout',component:CheckoutComponent,canActivate: [AuthGuard]},
  { path:'BookAppointment/specialities', component: SpecialitiesComponent},
  { path:'BookAppointment/doctors/:serviceId', component: DoctorsComponent},
  { path:'BookAppointment/appointment/:slotDate/:slotTime/:clinicAddress/:service' ,component: AppointmentComponent}
  // { path: '**', redirectTo: 'login' } ,

];
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
