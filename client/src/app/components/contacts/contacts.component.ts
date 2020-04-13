import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShareDataService } from '../../services/share-data/share-data.service';
import { ContactsService } from '../../services/contacts/contacts.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { errorsMessage } from '../../common/const/text-app.const'
import { HttpErrorResponse } from '@angular/common/http';

export interface Iitems {
  picture: string;
  name: string;
  isActive: boolean;

}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ShareDataService]
})
export class ContactsComponent implements OnInit {

  filterItem: string

  constructor(private router: Router,
    private contactsService: ContactsService,
    private shareDataService: ShareDataService,
    private dialog: MatDialog) {

    this.contactsService.getContacts().subscribe(response => {
      this.shareDataService.updateCotactList(response);
    }, (ex: HttpErrorResponse) => {
      this.openAlertDialog(ex.error.message);
    })
  }


  ngOnInit(): void {
  }

  filterList(filter) {
    this.filterItem = filter;
  }

  addNewItem() {
    this.router.navigate(['/item']);
  }

  deleteItem() {
    const rows = this.shareDataService.removeList;
    
    if (rows.length == 0) {
      this.openAlertDialog(errorsMessage.DELETE_ERROR);
    }
    else {
      const ids = rows.map((item) => item.userID)
      this.contactsService.deleteContact(ids).subscribe((res) => {
        this.contactsService.getContacts().subscribe(response => {
          this.shareDataService.removeList = [];
          this.shareDataService.updateCotactList(response);
        }, (ex: HttpErrorResponse) => {
          this.openAlertDialog(ex.error.message);
        })
      }, (ex: HttpErrorResponse) => {
        this.openAlertDialog(ex.error.message);
      });
    }
  }

  openAlertDialog(error) {
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
