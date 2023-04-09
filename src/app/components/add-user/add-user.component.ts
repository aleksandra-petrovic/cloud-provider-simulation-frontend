import { trigger } from '@angular/animations';
import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AddUserService } from 'src/app/services/add-user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  permissions: string[] = [];
  clientpermissions: string[] = [];
  granted: boolean = true;

  constructor(private addUserService: AddUserService, private formBuilder: FormBuilder) {
    this.addForm = this.formBuilder.group({
      name: ['',Validators.required],
      surname: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      can_read_users: [false],
      can_update_users: [false],
      can_delete_users: [false],
      can_create_users: [false]
    })
  }

  ngOnInit(): void {
    this.granted = true;
    if(!localStorage.getItem('permissions')?.includes('can_create_users')){
      window.alert("You don't have permission to access this page.")
      this.granted = false;
    }
  }

  addUser(): void {

    if(this.addForm.get('can_read_users')?.value){
      this.permissions.push('can_read_users');
    }
    if(this.addForm.get('can_update_users')?.value){
      this.permissions.push('can_update_users');
    }
    if(this.addForm.get('can_delete_users')?.value){
      this.permissions.push('can_delete_users');
    }
    if(this.addForm.get('can_create_users')?.value){
      this.permissions.push('can_create_users');
    }

    this.addUserService.addUser(
      this.addForm.get('name')?.value,
      this.addForm.get('surname')?.value,
      this.addForm.get('email')?.value,
      this.addForm.get('password')?.value,
      this.permissions,
    ).subscribe(added => {
      this.addForm.reset();
      console.log(added);
      window.alert('successfully added user ' + added.email);
    })
  }
}
