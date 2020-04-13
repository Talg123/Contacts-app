import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  private readonly serverURL: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  getContacts() {
    return this.httpClient.get(`${this.serverURL}/get-contacts`, {})
  }

  deleteContact(contacts) {
    return this.httpClient.post(`${this.serverURL}/delete-contact`, { id: contacts })
  }

  addContact(picture, name, roles, isActive, telephone) {
    return this.httpClient.post(`${this.serverURL}/add-contact`, { "picture": picture, "name": name, "roles": roles, "isActive": isActive, "telephone": telephone })
  }
  
  setContact(userID,picture, name, roles, isActive,telephone) {
    return this.httpClient.put(`${this.serverURL}/set-contact`, { "id":userID,"picture": picture, "name": name, "roles": roles, "isActive": isActive, "telephone": telephone })
  }

}

