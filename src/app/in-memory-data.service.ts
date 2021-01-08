import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
 // private prodottiUrl = 'api/prodotti';  // URL to web api
  createDb() {
    const prodotti = [
      {
        nome_prodotto: "Shop bag",
        id_prodotto: "1001",
        prezzo_prodotto: 0.15,
        stock: 5000,
        img_prodotto: "../assets/img/sacchetto.jpg"
      },
      {
        nome_prodotto: "Calzari beach tennis",
        id_prodotto: "1002",
        prezzo_prodotto: 12.99,
        stock: 10,
        img_prodotto: "../assets/img/calzaribeach.jpg"
      },
      {
        nome_prodotto: "MTB Enduro",
        id_prodotto: "1003",
        prezzo_prodotto: 999.99,
        stock: 2,
        img_prodotto: "../assets/img/mtbenduro.jpg"
      },
      {
        nome_prodotto: "Scarponi trekking",
        id_prodotto: "1004",
        prezzo_prodotto: 49.99,
        stock: 6,
        img_prodotto: "../assets/img/scarpetrekking.jpg"
      },
      {
        nome_prodotto: "Canestro Basket",
        id_prodotto: "1005",
        prezzo_prodotto: 299.99,
        stock: 5,
        img_prodotto: "../assets/img/canestro.jpg"
      },
      {
        nome_prodotto: "Pallone Champions League",
        id_prodotto: "1006",
        prezzo_prodotto: 39.99,
        stock: 15,
        img_prodotto: "../assets/img/pallone.jpg"
      },
      {
        nome_prodotto: "Tavola Snowboard",
        id_prodotto: "1007",
        prezzo_prodotto: 119.99,
        stock: 4,
        img_prodotto: "../assets/img/snowboard.jpg"
      },
      {
        nome_prodotto: "T-shirt Cross training",
        id_prodotto: "1008",
        prezzo_prodotto: 15.99,
        stock: 30,
        img_prodotto: "../assets/img/tshirt.jpg"
      },
      {
        nome_prodotto: "Racchetta Tennis",
        id_prodotto: "1009",
        prezzo_prodotto: 109.99,
        stock: 5,
        img_prodotto: "../assets/img/racchetta.jpg"
      },
      {
        nome_prodotto: "Tapis Roulant",
        id_prodotto: "1010",
        prezzo_prodotto: 699.99,
        stock: 3,
        img_prodotto: "../assets/img/tapis.jpg"
      }
    ];
    
    const clienti = [
      {
        nome_cliente: 'Sara',
        cognome_cliente:'Smeggi', 
        email_cliente :'aaa@aaa',
        carta_fedelta : '12345678'
      }
    ]
    return { prodotti, clienti }; 
  }

  // Esegue Overrides del metodo genId per assicurarsi che un prodotto abbia sempre un ID.
  // Se l'array di prodotti è vuoto,
  // il metodo riportato di seguito restituisce il numero iniziale (11).
  // Se l'array non è vuoto, il metodo seguente restituisce il più alto id prodotto +1.
  //genId(prodotti: Prodotto[]): number {
   // return prodotti.length > 0 ? Math.max(...prodotti.map(prodotto => prodotto.id)) + 1 : 11;
 // }


}