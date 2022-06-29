import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/models/Business';
@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  @Input() business!: Business;
  constructor() { }

  ngOnInit(): void {
  }

}
