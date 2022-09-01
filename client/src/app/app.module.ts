import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { COMMONCOMPONENTS } from './Common';
import { COMPONENTS } from './Components';
import { AuthTokenInterceptor } from './services/auth-token-interceptor.service';
import { HttpErrorInterceptor } from './shared/interceptors/httpError.interceptor';
import { SharedModule } from './shared/shared.module';
import { MemberCardComponent } from './Components/member/member-card/member-card.component';



@NgModule({
  declarations: [
    AppComponent,
    ...COMMONCOMPONENTS,
    ...COMPONENTS,
    MemberCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
