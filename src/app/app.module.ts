import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MachinesComponent } from './components/machines/machines.component';
import { CreateMachineComponent } from './components/create-machine/create-machine.component';
import { HistoryComponent } from './components/history/history.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    LoginComponent,
    MachinesComponent,
    CreateMachineComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
