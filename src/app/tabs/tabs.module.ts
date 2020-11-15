import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsPageRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,

  ],
  declarations: [TabsPage, LoginComponent, MainComponent, ModalUserComponent]
})
export class TabsPageModule {}
