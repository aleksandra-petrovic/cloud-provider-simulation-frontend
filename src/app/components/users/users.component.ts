import { Component, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/model';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  candelete: boolean = false;
  subscription: Subscription | undefined;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    if(localStorage.getItem('permissions')?.includes('can_read_users')){
      this.showUsers();
    }else{
      window.alert("You don't have permission to access this page.")
    }
    if(localStorage.getItem('permissions')?.includes('can_delete_users')){
      this.candelete = true;
    }
  }

  showUsers(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  deleteUser(userId: number): void{
    console.log("u delete metodi");
    this.usersService
    .deleteUser(userId)
    .subscribe(() => { });

    this.subscription = this.usersService.source.pipe(take(3)).subscribe(val => {
      console.log('triggered')
      this.showUsers();
    });
  }

}
