import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { Observable, of } from 'rxjs';
import { InMemoryDataService } from './in-memory-data.service';   
import { ProdottiComponent } from './prodotti/prodotti.component';
import { Prodotto } from './prodotti/prodotti.component'; 



@Injectable({
  providedIn: 'root',
})

export class DatabaseService {

  private prodottiUrl = 'api/prodotti';  // URL to web api
  private clientiUrl = 'api/clienti';
  private dbUrl = './in-memory-data.service';

  constructor(   
    private http: HttpClient,     //SARA2                                 //ci metto tutti i servizi
  ) { }

   /* public async readProdotti():Promise<any> {        //getHeroes
    let result: any = null;
    let promise: Promise<any> = new Promise((resolve, error) => {
      this.inMemoryDataService.getProdotti().then(
        (response$) => {
          result = response$;
          resolve(result);
        },
        (err) => {
          rejects(err)
        }

      )
        .catch(
          () => { }
        ); 

    }); 

    result = await promise; //attende risposta
    return result;

  } */   //SARA2
 

  /** readProdotti dal server */
public readProdotti(): Promise<any[]> {
  return this.http.get<any[]>(this.prodottiUrl).toPromise(); //chiamata Http per lettura del db, restituisce una promise
}

public readClienti(): Promise<any[]> {
  return this.http.get<any[]>(this.clientiUrl).toPromise();   
}

/** POST: add a new hero to the server */
addDatabaseProduct(newProduct: Prodotto): Observable<Prodotto> {
  return this.http.post<Prodotto>(this.dbUrl, newProduct);/*.pipe(
    /* tap((newHero: Prodotto) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero') )
  );*/
}

}

