import { Component, OnInit } from '@angular/core'; //Importi sempre il Component simbolo dalla libreria principale di Angular
// import { Prodotto } from '../prodotti';            //di Angular e annoti la classe del componente con .@Component
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormControl, FormGroup } from '@angular/forms';



@Component({             //@Component è una funzione di decoratore che specifica i metadati angolari per il componente.
  selector: 'app-prodotti',               //selettore di elementi CSS del componente
  templateUrl: './prodotti.component.html',   //la posizione del file modello del componente
  styleUrls: ['./prodotti.component.css']     //posizione degli stili CSS privati ​​del componente
})

export class ProdottiComponent implements OnInit {  //Sempre export di classe dei componenti in modo
  //da poterla utilizzare altrove con import
  public prodotti: Prodotto[] = [];     //array di elementi di tipo Prodotto
  public cart: Prodotto[] = [];
  public total: number;
  public found: boolean;    //var true quando prodotto inserito è presente nel db
  public valueNotFound: number;   //valorizzato in addProduct se found=false con id non trovato, passato come input a componente add-Product
  public idProductAdd = new FormControl('');    //casella input codice articolo
  public numProducts: number = 0;   //numero prodotti nel carrello
  public statusBtnAdd: boolean = true;    //se true buttonAdd è disabled, se false è cliccabile
  public viewHome: boolean = false;     //se true visualizzo cassa e barra navigazione - valorizzato a true in changePage
  public getNewProductForm: boolean = false;    //se true compare overlay per aggiunta prodotto - in changePageAddProduct valorizzato a true
  public getConfirmAddProduct: boolean = false;   //se true compare overlay per conferma aggiunta prodotto - valorizzato a true se id non è trovato in addProdotto - false in changePageAddProduct e offConfirmAddProduct
  public getFirstPage: boolean = true;    //se true compare overlay iniziale - true in onFirstPage - false in offFirstPage
  public getImgRight: boolean = true;    //se true nel box dx vedo immagine e btn prosegui - true in returnConfirmRemove, modifyCart e returnFidelityCard - false in confirmRemoveAll e goToCard 
  public getConfirmRemoveAll: boolean = false;    //se true nel box dx vedo conferma svuota carrello - true in confirmRemoveAll - false in returnConfirmRemove
  public blockChangeCart: boolean = false;    //se true non si vedono elementi per modificare carrello - true in goToCard - false in modifyCart
  public getFidelityCard: boolean = false;    //se true nel box dx vedo carta fedeltà - true in goToCard e returnPagamento- false in modifyCart, returnFidelityCard e getPagamento
  public getFormCreateCard: boolean = false;    //se true compare overlay nuova carta fedeltà - true in getCreateCard
  public getFormPagamento: boolean = false;   //se true nel box dx vedo ultima pag - true in getPagamento - false in returnPagamento
  public insertPsw = new FormControl('');
  public psw: string = "1234";
  public viewInsertPsw: boolean = false;
  public viewAlertPsw: boolean = false;
  public clients: Cliente[] = [];   //CAMBIARE NOME VAR CLIENTE
  public insertEmail = new FormControl('');
  public clientSelected: Cliente;
  public viewDataClient: boolean = false;

  constructor(
    private database: DatabaseService   //definisce una proprietà database privata e la identifica come DatabaseService sito di iniezione.
  ) { }

  ngOnInit() {
    this.leggiProdotti();
    console.log(this.prodotti)   //Angular chiama ngOnInit()subito dopo la creazione di un componente;posto dove inserire la logica di inizializzazion, posto in cui componente recupera i suoi dati iniziali.

    this.readClients();
    // this.drawBullet();
  }

  private leggiProdotti(): void {
    let array_result = [];
    this.database.readProdotti().then(           //risposta promise
      (response$) => {                  //gestione risposta giusta
        array_result = response$;
        array_result.forEach((elemento) => {
          this.prodotti.push(elemento);
        });
        console.log(array_result);      //stampa a video
        console.log(this.prodotti);
      },
      (error) => {      //gestione risposta errata
        console.log(error);
      }
    ).catch(

    )
  }

  private readClients(): void {
    let array_result = [];
    this.database.readClienti().then(           //risposta promise
      (response$) => {                  //gestione risposta giusta
        array_result = response$;
        array_result.forEach((elemento) => {
          this.clients.push(elemento);
        });
        console.log(array_result);      //stampa a video
        console.log(this.clients);
      },
      (error) => {      //gestione risposta errata
        console.log(error);
      }
    ).catch(

    )
  }

  public verifyEmail() {
    this.clients.forEach(element => {
      if (this.insertEmail?.value === element.email_cliente) {
        this.clientSelected = element;
        this.getPagamento();
        this.viewDataClient = true;
      }
    });
  }

  public changePage() {
    this.viewHome = true;
  }

  public addProdotto() {
    //var img = document.getElementById("imgProdotto");
    document.getElementById('imgProdotto').setAttribute("src", "../assets/img/default.jpg");
    this.found = false;
    this.prodotti.forEach(element => {
      if (element.id_prodotto == this.idProductAdd?.value) {   //CON === NON FUNZIONA!
        this.cart.push(element);
        document.getElementById('imgProdotto').setAttribute("src", element.img_prodotto);
        this.found = true;
        this.idProductAdd.setValue(null);
      }
    });
    if (!this.found) {
      this.valueNotFound = this.idProductAdd?.value;
      console.log("Aggiungi nuovo prodotto");
      this.getConfirmAddProduct = true;
    }
    this.calcTotal();
    /*   document.getElementById("buttonAdd").setAttribute("disabled","disabled"); */
    this.statusBtnAdd = true;
  }

  public btnAddStatus() {
    console.log("onChange");
    if (this.idProductAdd.value != '') {
      /* document.getElementById("buttonAdd").removeAttribute('disabled'); */
      this.statusBtnAdd = false;
    }
    else {
      /*   document.getElementById("buttonAdd").setAttribute('disabled','disabled') */
      this.statusBtnAdd = true;
    }
    /* if (this.idProductAdd == null)
      this.statusBtnAdd = true;
    else
      this.statusBtnAdd = false; */
  }

  // public on() {  //per vedere overlay quando non trova codice e richiedere se inserire articolo o meno
  //   document.getElementById("overlay").style.display = "block";
  // }



  public onFirstPage() {  //per vedere overlay quando non trova codice e richiedere se inserire articolo o meno
    //document.getElementById("overlayFirstPage").style.display = "block";
    this.getFirstPage = true;
  }

  public offConfirmAddProduct() {
    //document.getElementById("overlay").style.display = "none";
    this.getConfirmAddProduct = false;
    this.idProductAdd.setValue(null);
  }

  public offFirstPage() {
    //document.getElementById("overlayFirstPage").style.display = "none";
    this.getFirstPage = false;
    this.idProductAdd.setValue(null);
  }

  public getInsertPsw() {
    this.viewInsertPsw = true;
  }

  public offInsertPsw() {
    this.viewInsertPsw = false;
  }

  public verifyPsw() {
    if (this.insertPsw?.value === this.psw) {
      this.insertPsw.setValue(null);
      this.changePageAddProduct();
      this.viewAlertPsw = false;
    }
    else {
      this.viewAlertPsw = true;
      this.insertPsw.setValue(null);
    }
  }

  public changePageAddProduct() {
    //document.getElementById("overlay").style.display = "none";
    this.getConfirmAddProduct = false;
    this.getNewProductForm = true;
    //this.viewHome=false;
  }

  public returnPageAddProduct() {
    this.getNewProductForm = false;
    this.viewInsertPsw = false;
    this.idProductAdd.setValue(null);
  }

  public returnConfirmRemove() {
    this.getImgRight = true;
    this.getConfirmRemoveAll = false;
  }

  public returnFidelityCard() {
    this.getImgRight = true;
    this.getFidelityCard = false;
  }

  public removeProduct(idProdotto, index) {
    this.cart.forEach((element, i) => {
      if (element.id_prodotto === idProdotto && i === index)
        this.cart.splice(i, 1);
    });
    this.calcTotal();
    document.getElementById('imgProdotto').setAttribute("src", "../assets/img/default.jpg");
  }

  public confirmRemoveAll() {
    this.getImgRight = false;
    this.getConfirmRemoveAll = true;
  }

  public removeAll() {
    this.cart.splice(0, this.cart.length);
    this.calcTotal();
    this.returnConfirmRemove();
    //document.getElementById('imgProdotto').setAttribute( "src", "../assets/img/default.jpg" );
  }

  public addBag() {
    this.cart.push(this.prodotti[0]);
    document.getElementById('imgProdotto').setAttribute("src", "../assets/img/sacchetto.jpg");
    this.calcTotal();
  }

  public calcTotal() {     //TO DO 
    this.total = 0;
    this.cart.forEach(element => {
      this.total += element.prezzo_prodotto;
    });
    this.total = parseFloat((Math.round(this.total * 100) / 100).toFixed(2));   //DA SISTEMARE 
    this.numProducts = this.cart.length;     //settare numero articoli carrello
    console.log(this.total);
    /*  document.getElementById("prezzo").setAttribute("value",total);  */
  }

  public goToCard() {
    this.blockChangeCart = true;
    this.getImgRight = false;
    this.getFidelityCard = true;
  }

  public modifyCart() {
    this.blockChangeCart = false;
    this.getFidelityCard = false;
    this.getImgRight = true;
  }


  public getCreateCard() {
    this.getFormCreateCard = true;
  }

  public getPagamento() {
    this.getFormPagamento = true;
    this.getFidelityCard = false;
  }

  public returnPagamento() {
    this.getFormPagamento = false;
    this.getFidelityCard = true;
  }


  //document.getElementById("codice").innerHTML = "";

  // the JS isn't really interesting, it only toggles the 'active' class on the bullets

  /* private drawBullet(){
    const bullets = document.getElementsByClassName('bullet');
  
  // adds the onclick to each bullet
  Array.from(bullets).forEach(bullet => {
    bullet.addEventListener('click', e => {
      e.preventDefault();
      // remove active from every bullet parent
      Array.from(bullets).forEach(bullet => {
        const parent = bullet.parentNode;
        const className = 'active';
        if(parent.classList.contains(className)) {
          parent.classList.remove(className);
        }
      });
      // then add it back to the clicked one's parent
      e.target.parentNode.classList.add('active');
    })
  });
  
  // init
  bullets[1].parentNode.classList.add('active');
  } */

}

//creazione classe di tipo prodotto e cliente
export class Prodotto {
  nome_prodotto: string;
  id_prodotto: number;
  prezzo_prodotto: number;
  stock: number;
  img_prodotto: string;

  constructor(nome_prodotto: string, id_prodotto: number, prezzo_prodotto: number, stock: number, img_prodotto: string) {
    this.nome_prodotto = nome_prodotto;
    this.id_prodotto = id_prodotto;
    this.prezzo_prodotto = prezzo_prodotto;
    this.stock = stock;
    this.img_prodotto = img_prodotto;
  }
}

export class Cliente {
  nome_cliente: string;
  cognome_cliente: string;
  email_cliente: string;
  carta_fedelta: string;

  constructor(nome_cliente: string, cognome_cliente: string, email_cliente: string, carta_fedelta: string) {
    this.nome_cliente = nome_cliente;
    this.cognome_cliente = cognome_cliente;
    this.email_cliente = email_cliente;
    this.carta_fedelta = carta_fedelta;
  }
}


