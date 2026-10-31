import { Component, inject, signal, computed, effect } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Stock } from '../../models/stock';
import { StockRow } from '../stock-row/stock-row';

const WATCHLIST_KEY = 'pulse.watchlist';

function loadWatchList(): Set<string> {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    if (!raw) return new Set();
    const saved: unknown[] = JSON.parse(raw);
    // Storage is outside our control (old formats, manual edits): keep only valid symbols.
    return new Set(saved.filter((item): item is string => typeof item === 'string'));
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

  private readonly watchListState = signal<ReadonlySet<string>>(loadWatchList());
  readonly watchList = this.watchListState.asReadonly();

  watchedStock = computed(() => this.watchList().size);

  constructor() {
    effect(() => {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...this.watchList()]));
    });
  }

  watchListValues = computed(() => {
    const watched = this.watchList();
    return this.stocks
      .filter((stock) => watched.has(stock.symbol))
      .reduce((sum, stock) => sum + stock.price, 0);
  });

  addToWatchList(stock: Stock) {
    this.watchListState.update((current) => {
      const next = new Set(current);
      if (next.has(stock.symbol)) {
        next.delete(stock.symbol);
      } else {
        next.add(stock.symbol);
      }
      return next;
    });
  }

  isInWatchList(stock: Stock): boolean {
    return this.watchList().has(stock.symbol);
  }
}
