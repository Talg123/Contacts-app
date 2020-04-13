import { Injectable } from '@angular/core';
import {  Observable,Subject } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  contactsObservable: Observable<any>;
  contactsSubject: Subject<any> = new Subject<any>();
  removeList:any = []

  constructor() { 
    this.contactsObservable = this.contactsSubject.asObservable();
    
  }

  updateCotactList(contactsList){
    this.contactsSubject.next(contactsList)
  }
}



