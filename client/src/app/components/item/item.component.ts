import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { defaults } from '../../common/const/text-app.const'
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { ContactsService } from '../../services/contacts/contacts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  visible = true; selectable = true; removable = true; addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  roles: any[] = []
  userID: string;
  isActiveValue: boolean = false;
  nameValue: string;
  telephoneValue: string
  pictureValue: string;
  isSet: boolean = false;


  editForm = new FormGroup({
    name: new FormControl(this.nameValue, Validators.required),
    picture: new FormControl(this.pictureValue),
    roles: new FormControl(this.roles),
    isActive: new FormControl(this.isActiveValue),
    telephone: new FormControl(this.telephoneValue)
  })

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (this.activatedRoute.snapshot.params.name) {
      this.isSet = true;
      this.roles = this.activatedRoute.snapshot.params.roles.split(',')
      this.isActiveValue = this.activatedRoute.snapshot.params.isActive === 'false' ? false : true
      this.nameValue = this.activatedRoute.snapshot.params.name
      this.pictureValue = this.activatedRoute.snapshot.params.picture
      this.telephoneValue = this.activatedRoute.snapshot.params.telephone
      this.userID = this.activatedRoute.snapshot.params.userID
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.roles.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(role: string): void {
    const index = this.roles.indexOf(role);
    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }


  onSubmit() {
    if (!this.isSet) {
      this.contactsService.addContact(!this.pictureValue ? defaults.DEFAULT_PICTURE : this.pictureValue,
        this.nameValue,
        this.roles,
        this.isActiveValue,
        this.telephoneValue)
        .subscribe((res) => {
          this.router.navigate(['/']);
        }, (ex: HttpErrorResponse) => {
          this.openAlertDialog(ex.error.message);
        });
    }
    else {
      this.contactsService.setContact(this.userID, this.pictureValue, this.nameValue, this.roles, this.isActiveValue, this.telephoneValue).subscribe((res) => {
        this.router.navigate(['/']);
      }, (ex: HttpErrorResponse) => {
        this.openAlertDialog(ex.error.message);
      });
    }
  }

  isSubmitEnabled(): boolean {
    return this.editForm.valid
  }

  checkPicture() {
    if (this.pictureValue) {
      return this.pictureValue
    }
    return defaults.DEFAULT_PICTURE;
  }

  clickBack() {
    this.router.navigate(['/']);
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
