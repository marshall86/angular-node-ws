import { map, catchError, tap } from 'rxjs/operators';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';

import { QuoteData } from './interfaces/stock-quote';
import { DataService } from './services/data.service';
import { StockCardComponent } from './components/stock-card/stock-card.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NgIf, NgFor, AsyncPipe, StockCardComponent]
})
export class AppComponent implements AfterViewInit, OnDestroy {

  title = 'Realtime stocks quotes';
  loading = 'Loading, please wait...';
  interval: any;

  data = inject(DataService);
  stocksQuotes$ = this.data.requests$.pipe(
    map((d: { error: any, result: QuoteData[] }) => {
      this.loading = '';
      return d.result;
    }),
    catchError(error => { throw error }),
    tap({
      error: error => console.log('[stocks] Error:', error),
      complete: () => console.log('[stocks] Connection Closed')
    })
  );

  ngOnDestroy(): void {
    this.destroyInterval();
  }

  ngAfterViewInit(): void {
    this.data.connect();
    let i = 0;
    // limiting to 10 number of server request because of Yahoo api limit of 500 calls
    this.interval = setInterval(() => {
      if (i < 10) {
        this.data.sendRequest('AAPL, GOOG, MSFT, TSLA');
        i++;
      } else {
        this.destroyInterval();
      }
    }, 1000);
  }

  destroyInterval(): void {
    if (this.interval) {
      this.interval = clearInterval(this.interval);
    }
  }

}
