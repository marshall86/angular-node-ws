import { AfterViewInit,  Component } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { QuoteData } from './interfaces/stock-quote';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'Realtime stocks quotes';
  loading = 'Loading, please wait...';
  stocksQuotes$ = this.data.requests$.pipe(
    map((d: { error: any, result: QuoteData[] } ) => {
      this.loading = '';
      console.log(d);
      return d.result;
    }),
    catchError(error => { throw error }),
    tap({
      error: error => console.log('[stocks] Error:', error),
      complete: () => console.log('[stocks] Connection Closed')
    })
  );

  constructor(private data: DataService) { }

  ngAfterViewInit() {
    this.data.connect();
    let i = 0;
    // limiting to 10 number of server request because of Yahoo api limit of 500 calls
    setInterval(() => {
      if (i < 1) {
        this.data.sendRequest("AAPL, GOOG, MSFT, TSLA");
        i++;
      } else {
        clearInterval();
      }
    }, 1000);
  }

}
