import { Component, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import _ from 'lodash'
import { ITable } from '../../../models/ITable'
import { ShareDataService } from '../../../services/share-data/share-data.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],

})
export class ItemListComponent implements OnChanges {

  @Input() filterValue: string;

  itemsData: ITable[] = [];
  displayedColumns: string[] = ['select', 'picture', 'name', 'telephone' ,'isActive', 'action'];
  dataSource
  selection = new SelectionModel<ITable>(true, []);


  constructor(private shareDataService: ShareDataService, private router: Router) {

    this.shareDataService.contactsObservable.subscribe(res => {
      this.itemsData = res;
      this.dataSource = new MatTableDataSource<ITable>(this.itemsData);
    })

  }


  ngOnChanges(): void {
    if (this.filterValue) {
      this.dataSource.filter = this.filterValue;
    }
    else {
      this.dataSource = new MatTableDataSource<ITable>(this.itemsData);
    }
  }

  clickOnLine(event, row) {

    event.stopPropagation();
    if (this.isExist(row.name)) {
      _.remove(this.shareDataService.removeList, (item: any) => item.name === row.name);
    } else {

      this.shareDataService.removeList.push(row);
    }
  }

  isExist(name: string): boolean {
    return _.some(this.shareDataService.removeList, { name });
  }


  edit(element) {
    element.roles = this.handleRoles(element.roles)
    this.router.navigate(['/item', element]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

 
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
      } row ${row.id + 1}`;
  }

  handleRoles(rolesArr){
    const roles = []
    for (const role of rolesArr) {
      roles.push(role.role);
    }
    return roles;
  }

}
