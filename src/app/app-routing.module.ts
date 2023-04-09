import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CreateMachineComponent } from './components/create-machine/create-machine.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MachinesComponent } from './components/machines/machines.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "auth/login",
    component: LoginComponent,
  },
  {
    path: "home/users",
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "home/users/edit-user/:id",
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "home/users/add-user",
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "machines/search",
    component: MachinesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "machines/create",
    component: CreateMachineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "machines/history",
    component: HistoryComponent,
    canActivate: [AuthGuard],
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
