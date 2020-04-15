import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShareDataService } from '../../services/share-data/share-data.service';
import { ContactsService } from '../../services/contacts/contacts.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { errorsMessage } from '../../common/const/text-app.const'
import { HttpErrorResponse } from '@angular/common/http';

export interface IItems {
  picture: string;
  name: string;
  isActive: boolean;
} // get this out to your models.ts

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ShareDataService] // this is wierd and not needed....
})
export class ContactsComponent implements OnInit {

  public filterItem: string

  constructor(private router: Router,
    private contactsService: ContactsService,
    private shareDataService: ShareDataService,
    private dialog: MatDialog) {
  }


  async ngOnInit(): void {
    await this.getContacts();
  }
  
  private async getContacts(): void {
    try {
      const response = await this.contactsService.getContacts().toPromise();
      this.shareDataService.updateCotactList(response);
    } catch(e) {
      this.openAlertDialog(ex.error.message);
    }
  }

  public filterList(filter: string): void {
    this.filterItem = filter;
  }

  public addNewItem(): void {
    this.router.navigateByUrl('/item');
  }

  public async deleteItem(): void {
    const rows = this.shareDataService.removeList;
    
    if (rows.length === 0) {
      this.openAlertDialog(errorsMessage.DELETE_ERROR);
    }
    else {
      const ids = rows.map((item) => item.userID)
      const res = await this.contactsService.deleteContact(ids).toPromise();
      await this.getContacts();
      this.shareDataService.removeList = []; // I wouldnt have never let this happen, you should make a getter/setter
    }
  }

  public openAlertDialog(error: string): void {
    this.dialog.open(AlertDialogComponent, {
      data: {
        message: error,
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  }
}
