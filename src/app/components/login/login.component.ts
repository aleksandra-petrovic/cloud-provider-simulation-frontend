import { Component, OnInit } from '@angular/core';
import { LoginResponse, Permission } from 'src/app/model';
import { LoginService } from 'src/app/services/login.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  permissions: string[] = ['can_read_users', 'can_delete_users', 'can_create_users', 'can_update_users',
                            'can_search_machines', 'can_start_machines', 'can_stop_machines', 'can_restart_machines',
                            'can_create_machines', 'can_destroy_machines'];

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
    })
  }

  ngOnInit(): void {}

  setToken(token: string){
    localStorage.setItem('token', token);
    let p: string = '';
    const str = atob(token.split('.')[1]);
    console.log(str);
    
    for(var perm of this.permissions){
      if(str.includes(perm)) { p += perm + ' '; }
    }

    if(p == '') {
      window.alert("You dont have any permissions.")
    }

    console.log(p);

    localStorage.setItem('permissions', p);
  }

  login(){
    this.loginService.loginUser(
      this.loginForm.get('username')?.value,
      this.loginForm.get('password')?.value
    ).subscribe(login => {
      this.loginForm.reset();
      console.log(login);
      this.setToken(login.jwt);
      window.alert("You are logged in");
    })
    
  }

}
