import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { ProdottiComponent} from '../prodotti/prodotti.component';
import { Prodotto } from '../prodotti/prodotti.component'; 


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'] 
})

export class AddProductComponent implements OnInit {

  @Input() idNewProduct: number;
  @Output() newProductName = new EventEmitter<string>();
  @Output() prodotti: Prodotto[] = [];
  public productToAdd = new Prodotto ("scarpe", 1011, 59.99, 1, "../assets/img/default.jpg")
 //se gestisco stock qui è da aggiungere


   addProductForm = new FormGroup ({
    name : new FormControl(''),
    price : new FormControl(''),
  }); 
 
  constructor(
    private database: DatabaseService   //definisce una proprietà database privata e la identifica come DatabaseService sito di iniezione.
  ) { }

  ngOnInit(): void {
  }

  public onSubmit () {
    //this.newProductPrice.emit(this.idNewProduct);
    //this.newProductPrice.emit(this.addProductForm.get.price);
  }




/*  PROVA */
  add(): void {
    if (!this.productToAdd) { return; }
    this.database.addDatabaseProduct(this.productToAdd)
      .subscribe(newProduct => {
        this.prodotti.push(newProduct);
      });
  }
}








