import { Component, inject, signal, computed } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Stock } from '../../models/stock';
import { WatchListStock } from '../../models/watch-list-stock';

@Component({
  imports: [],
  selector: 'app-stock-list',
  styleUrl: './stock-list.scss',
  templateUrl: './stock-list.html',
})
export class StockListComponent {
  private marketService = inject(MarketService);
  stocks: Stock[] = this.marketService.generateStocks();
  watchList = signal<Set<WatchListStock>>(new Set());

  watchedStock = computed(() => this.watchList().size);

  watchListValues = computed(() =>
    [...this.watchList().values()].reduce((sum, s) => sum + s.price, 0),
  );

  addToWatchList(stock: Stock) {
    const current = this.watchList();
    const existing = [...current].find((s) => s.symbol === stock.symbol);

    if (existing) {
      const next = new Set(current);
      next.delete(existing);
      this.watchList.set(next);
    } else {
      const next = new Set(current);
      next.add({ symbol: stock.symbol, price: stock.price, isActive: true });
      this.watchList.set(next);
    }
  }

  isInWatchList(stock: Stock): boolean {
    return [...this.watchList()].some((s) => s.symbol === stock.symbol);
  }
}
