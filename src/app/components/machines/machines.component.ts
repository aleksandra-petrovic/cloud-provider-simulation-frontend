import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Subscription, take, takeUntil, takeWhile } from 'rxjs';
import { ErrorMsg, Machine } from 'src/app/model';
import { MachinesService } from 'src/app/services/machines.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  machines: Machine[] = [];
  searchForm: FormGroup;
  scheduleForm: FormGroup;
  status: string[];
  granted: boolean = true;
  canstart: boolean = false;
  canstop: boolean = false;
  canrestart: boolean = false;
  candestroy: boolean = false;
  subscription: Subscription | undefined;

  constructor(private machinesService: MachinesService, private formBuilder: FormBuilder) { 
    this.searchForm = this.formBuilder.group({
      machineName: '',
      status1: false,
      status2: false,
      dateFrom: '',
      dateTo: ''
    }),
    this.scheduleForm = this.formBuilder.group({
      operation: ['',Validators.required],
      scheduleDate: ['',Validators.required],
      machineId: [-1, Validators.required]
    })
    this.status = [];
  }

  ngOnInit(): void {
    this.granted = true;
    if(!localStorage.getItem('permissions')?.includes('can_search_machines')){
      window.alert("You don't have permission to access this page.")
      this.granted = false;
    }else{

      if(localStorage.getItem('permissions')?.includes('can_start_machines')){
        this.canstart = true;
      }

      if(localStorage.getItem('permissions')?.includes('can_stop_machines')){
        this.canstop = true;
      }

      if(localStorage.getItem('permissions')?.includes('can_restart_machines')){
        this.canrestart = true;
      }

      if(localStorage.getItem('permissions')?.includes('can_destroy_machines')){
        this.candestroy = true;
      }


      if(localStorage.getItem('intervalLength') != null){
        this.subscription = this.machinesService.source.pipe(take(parseInt(localStorage.getItem('intervalLength')!))).subscribe(val => {
          console.log('triggered')
          this.searchForm.reset();
          this.search();
        });
      }
      this.search();
    }
  }

  destroy(id: number): void { 
    this.subscription = this.machinesService.source.pipe(take(5)).subscribe(val => {
      console.log('triggered')
      this.searchForm.reset();
      this.search();
      localStorage.setItem('intervalLength', (5 - val).toString());
    });
  
    this.machinesService.destroyMachine(id).subscribe(result => {
      console.log(result);
      //window.alert(result);
    })
  }

  schedule(): void{
    this.update(this.scheduleForm.get('machineId')?.value, this.scheduleForm.get('operation')?.value);
  }

  update(id: number, operation: string): void {
    this.subscription = this.machinesService.source.pipe(take(12)).subscribe(val => {
      console.log('triggered')
      this.searchForm.reset();
      this.search();
      localStorage.setItem('intervalLength', (12 - val).toString());
    });

    localStorage.setItem('intervalLength', (0).toString());

    this.machinesService.updateMachine(
      id,
      operation,
      this.scheduleForm.get('scheduleDate')?.value
    ).subscribe( result => {
      this.scheduleForm.reset();
      console.log(result);
     // window.alert(result.response);
    })
  }

  search(): void {
    if(this.searchForm.get('status1')?.value){
      this.status.push('STOPPED');
    }
    if(this.searchForm.get('status2')?.value){
      this.status.push('RUNNING');
    }

    this.machinesService.searchMachines(
      this.searchForm.get('machineName')?.value,
      this.status,
      this.searchForm.get('dateFrom')?.value,
      this.searchForm.get('dateTo')?.value
    ).subscribe(result => {
      this.searchForm.reset();
      this.status = [];
      console.log(result);
      this.machines = result;
      //window.alert('successfully added user ' + added.email);
    })
  }

}
