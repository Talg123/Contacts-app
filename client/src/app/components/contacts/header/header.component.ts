import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ShareDataService } from '../../../services/share-data/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onFilterEvent = new EventEmitter<string>();
  counterIsActive:number
  
  constructor(private shareDataService:ShareDataService) {

   }

  ngOnInit(): void {
    this.shareDataService.contactsObservable.subscribe(response =>{
      this.counterIsActive = response.length
    })
  }

  searchContact(value: string) {
     this.onFilterEvent.emit(value)
  }
  

}
