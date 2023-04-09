import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { EditUserService } from 'src/app/services/edit-user.service';
import { Permission, User } from 'src/app/model';
import { LoginService } from 'src/app/services/login.service';
import { Subscription, take } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  permissions: string[] = [];
  id: number = 0;
  granted: boolean = true;
  subscription: Subscription | undefined
  permission: Permission = {
    permissionId: 0,
    permission: ''
  }
  user: User = {
    userId: 0,
    name: '',
    surname: '',
    email: '',
    permissions: []
  };
  

  constructor(private route: ActivatedRoute, private editUserService: EditUserService, private usersService: UsersService, private formBuilder: FormBuilder) { 
    this.editForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      email: [''],
      can_read_users: [false],
      can_update_users: [false],
      can_delete_users: [false],
      can_create_users: [false]
    })
  }

  ngOnInit(): void {
    this.granted = true;
    if(!localStorage.getItem('permissions')?.includes('can_update_users')){
      window.alert("You don't have permission to access this page.")
      this.granted = false;
    }else{
      this.showUser();
    }
  }

  showUser(): void {
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    console.log("ID"+this.id);

    this.editUserService.getUser(this.id).subscribe((user) => {
      this.user = user;

      for(var p of user.permissions){
        this.permissions.push(p.permission);
      }

    })
  }

  editUser(): void {
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));

    if(this.editForm.get('can_read_users')?.value && !this.permissions.includes('can_read_users')){
      this.permissions.push('can_read_users');
    }
    if(this.editForm.get('can_update_users')?.value && !this.permissions.includes('can_update_users')){
      this.permissions.push('can_update_users');
    }
    if(this.editForm.get('can_delete_users')?.value && !this.permissions.includes('can_delete_users')){
      this.permissions.push('can_delete_users');
    }
    if(this.editForm.get('can_create_users')?.value && !this.permissions.includes('can_create_users')){
      this.permissions.push('can_create_users');
    }

    let name: string;
    let surname: string;
    let email: string;

    if(this.editForm.get('name')?.value){
      name = this.editForm.get('name')?.value;
    }else{
      name = this.user.name;
    }

    if(this.editForm.get('surname')?.value){
      surname = this.editForm.get('surname')?.value;
    }else{
      surname = this.user.surname;
    }

    if(this.editForm.get('email')?.value){
      email = this.editForm.get('email')?.value;
    }else{
      email = this.user.email;
    }

    this.editUserService.editUser(
      this.id,
      name,
      surname,
      email,
      this.permissions,
    ).subscribe(edited => {
      this.editForm.reset();
      console.log(edited);
    })

    this.subscription = this.usersService.source.pipe(take(3)).subscribe(val => {
      console.log('triggered')
      this.showUser();
    });

  }

}
