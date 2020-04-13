import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './components/item/item.component';
import { ContactsComponent } from './components/contacts/contacts.component';


const routes: Routes = [
 
  { path: '', component: ContactsComponent },
  { path: 'item', component: ItemComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
