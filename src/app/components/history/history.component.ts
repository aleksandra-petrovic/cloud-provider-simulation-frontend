import { Component, OnInit } from '@angular/core';
import { ErrorMsg } from 'src/app/model';
import { MachinesService } from 'src/app/services/machines.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  errors: ErrorMsg[] = [];

  constructor(private machinesService: MachinesService) { }

  ngOnInit(): void {
    this.history();
  }

  history(): void {
    this.machinesService.history().subscribe(result => {
      this.errors = result;
    })
  }

}
