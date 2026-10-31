import { Component, input, output } from '@angular/core';
import { Stock } from '../../models/stock';

@Component({
  imports: [],
  selector: 'app-stock-row',
  styleUrl: './stock-row.scss',
  templateUrl: './stock-row.html',
})
export class StockRow {
  stockInput = input.required<Stock>();
  isStockPresent = input.required<boolean>();
  stockToAdd = output<Stock>();

  addOrRemoveStock(stock: Stock) {
    this.stockToAdd.emit(stock);
  }
}
