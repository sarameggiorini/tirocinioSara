import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // NgModel vive qui
import { HttpClientModule } from '@angular/common/http'; //API HTTP client semplificata per le applicazioni Angular
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';  //per poter utilizzare in-memory-web-api
import { InMemoryDataService } from './in-memory-data.service';              //con queste 2 righe importo Api web in memoria
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { ClientiComponent } from './clienti/clienti.component';
import { AddProductComponent } from './add-product/add-product.component';  //clienti per carta decathlon**


@Injectable({
  providedIn: 'root'
})


@NgModule({

  declarations: [
    AppComponent,
    ProdottiComponent,
    ClientiComponent,
    AddProductComponent    //clienti per carta decathlon**
  ],

  imports: [
    BrowserModule,
    HttpClientModule,     // importa HttpClientModule dopo BrowserModule
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),   // Il HttpClientInMemoryWebApiModule intercetta le richieste HTTP
    FormsModule,                                       // e riceve risposte simulate del server.
    AppRoutingModule,                 // Eliminalo quando un reale server è pronto a ricevere richieste. 
    ReactiveFormsModule
/*HttpClientInMemoryWebApiModule.forRoot(
  InMemoryDataService, { dataEncapsulation: false }                                                                                                                                                                                                                                                                                                                                       
),*/ 
  ],

  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }




