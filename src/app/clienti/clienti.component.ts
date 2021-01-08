import { Component, OnInit } from '@angular/core'; //Importi sempre il Component simbolo dalla libreria principale di Angular
                                                 //di Angular e annoti la classe del componente con .@Component
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MaskedTextChangedListener } from 'ts-input-mask'; 


@Component({             //@Component è una funzione di decoratore che specifica i metadati angolari per il componente.
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})

export class ClientiComponent implements OnInit {  //Sempre export di classe dei componenti in modo 
                                                    //da poterla utilizzare altrove con import 
  // public clienti: Cliente[];

  constructor( 
    private database :DatabaseService      //definisce una proprietà database privata e la identifica come DatabaseService sito di iniezione.
    ) { }

  ngOnInit() {

var input = document.querySelectorAll('#birth-date')[0];
  
var dateInputMask = function dateInputMask(elm) {
  elm.addEventListener('keypress', function(e) {
    if(e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
    
    var len = elm.value.length;
    
    // If we're at a particular place, let the user type the slash
    // i.e., 12/12/1212
    if(len !== 1 || len !== 3) {
      if(e.keyCode == 47) {
        e.preventDefault();
      }
    }
    
    // If they don't add the slash, do it for them...
    if(len === 2) {
      elm.value += '/';
    }

    // If they don't add the slash, do it for them...
    if(len === 5) {
      elm.value += '/';
    }
     //Per bloccare input a gg/mm/aaaa
     if(len >= 10) {
      e.preventDefault();
    }
  });
};
  
dateInputMask(input);
    
    // this.leggiClienti();            //Angular chiama ngOnInit()subito dopo la creazione di un componente. 
  }                                   //È un buon posto per inserire la logica di inizializzazione, ossia 
                                      //posto in cui il componente recupera i suoi dati iniziali.

    /* private leggiProdotti(): void {
    debugger
    this.database.readProdotti().then( //.getHeroes
    (response) => {
      console.log(response)
    },
    (error) => {
      console.log(error)
    }
   )
   .catch(
   )
  }  */ //SARA2 

  /* leggiClienti(): void {
    this.database.readClienti()
        .subscribe(clienti => this.clienti = clienti);
  }   //SARA2 */

}




