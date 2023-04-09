import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Machine } from 'src/app/model';
import { MachinesService } from 'src/app/services/machines.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {

  createForm: FormGroup;
  granted: boolean = true;

  constructor(private machinesService: MachinesService, private formBuilder: FormBuilder) { 
    this.createForm = this.formBuilder.group({
      machineName: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.granted = true;
    if(!localStorage.getItem('permissions')?.includes('can_create_machines')){
      window.alert("You don't have permission to access this page.")
      this.granted = false;
    }
  }

  create(): void { 
    this.machinesService.createMachine(
      this.createForm.get('machineName')?.value
    ).subscribe(result => {
      console.log(result);
      //window.alert(result);
    })
  }

}
