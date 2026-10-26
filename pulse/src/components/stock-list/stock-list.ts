import { Component, inject } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Stock } from '../../models/stock';

@Component({
  imports: [],
  selector: 'app-stock-list',
  styleUrl: './stock-list.scss',
  templateUrl: './stock-list.html',
})
export class StockListComponent {
  private marketService = inject(MarketService);
  stocks: Stock[] = this.marketService.generateStocks();
}
