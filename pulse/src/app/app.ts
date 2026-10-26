import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockListComponent } from '../components/stock-list/stock-list';

@Component({
  selector: 'app-root',
  imports: [StockListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pulse');
}
