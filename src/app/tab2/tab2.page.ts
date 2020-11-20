import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll } from '@ionic/angular';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  status = {
    data: null,
    loading: null,
    error: null
  };
  access: any ;
  accessFilter: any;
  myModel: string;
  page = 1;
  idCondominio: any;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;




  constructor(private router: Router,
    private service: ServicesService,
    private storage: Storage) { }
  goToMain() {
    this.router.navigate(['/main']);

  }
  ngOnInit() {
    this.storage.get('data').then((val) => {
      console.log('Your age is', val);
      console.log(val.user.data[0].id_condominio);
      this.idCondominio = val.user.data[0].id_condominio;
      this.getData(val.user.data[0].id_condominio, this.page);
    });
  }

  getData(id, page) {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    this.service.getAcces(id, page).toPromise().then((rsp: any) => {
      this.access = rsp.data;
      this.accessFilter = rsp.data;

      console.log(rsp);
      this.status.data = true;
      this.status.loading = false;
    }, err => {
      console.log(err);
      this.status.error = true;
      this.status.loading = false;
    });

  }
  refreshData(id, page, event) {

  

  }
  tryAgain() {
    this.status.data = false;
    this.status.loading = false;
    this.status.error = false;
    this.getData(this.access.user.data[0].id_condominio, '1');

  }
  filterByCell(filterValue: any): void {
    console.log(filterValue);
    this.accessFilter = this.access;
    this.accessFilter = this.accessFilter.filter((item) => {
      console.log(item);
      console.log(item.telefono.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim()));
      return item.telefono.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim());
    });
  }
  loadData(event) {

      console.log('Done');
      // this.refreshData(this.idCondominio, (this.page + 1), event);
     
      this.page = this.page + 1;
      console.log(this.page);
      // setTimeout(() => {
      //   const nuevoArr = Array(20)
      //   this.accessFilter.push(...nuevoArr)
      //   event.target.complete()
        
      // }, 1000);
      
      this.service.getAcces(this.idCondominio, this.page).toPromise().then((rsp: any) => {
        this.accessFilter.push(...rsp.data);
        event.target.complete();
        console.log(rsp);
        if (rsp.pagination.err) {
          event.target.disabled = true;
        }
      }, err => {
        console.log(err);
      });

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // event.target.disabled = true;
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
