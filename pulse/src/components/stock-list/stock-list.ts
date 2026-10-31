import { Component, inject, signal, computed, effect } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Stock } from '../../models/stock';
import { WatchListStock } from '../../models/watch-list-stock';
import { StockRow } from '../stock-row/stock-row';

const WATCHLIST_KEY = 'pulse.watchlist';

function loadWatchList(): Set<WatchListStock> {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

@Component({
  imports: [StockRow],
  selector: 'app-stock-list',
  styleUrl: './stock-list.scss',
  templateUrl: './stock-list.html',
})
export class StockListComponent {
  private marketService = inject(MarketService);
  stocks: Stock[] = this.marketService.generateStocks();

  watchList = signal<Set<WatchListStock>>(loadWatchList());
  watchedStock = computed(() => this.watchList().size);

  constructor() {
    effect(() => {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...this.watchList()]));
    });
  }

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
