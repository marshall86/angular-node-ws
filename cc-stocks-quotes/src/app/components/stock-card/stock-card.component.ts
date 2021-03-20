import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { QuoteData } from 'src/app/interfaces/stock-quote';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockCardComponent {

  data: any = {};

  @Input() set quote(value: QuoteData) {
    // checking if stock data is already stored
    const storedStock = JSON.parse(localStorage.getItem(value.symbol) || '{}');

    // if there is something in the storage we use 'status' property
    // else we set it as true and we store the object
    if (Object.keys(storedStock).length > 0) {
      value.status = storedStock.status;
    } else {
      value.status = true;
      localStorage.setItem(value.symbol, JSON.stringify(value));
    }

    // if the stock status is true it means we want to update the UI with the fresh data
    // else we use the stored one
    if (value.status) {
      value.regularMarketPrice = parseFloat(new Date().getTime().toFixed(2));
      this.data = value;
      this.cdr.markForCheck();      
    } else {
      this.data = storedStock;
    }

  }

  constructor(private cdr: ChangeDetectorRef) { }

  // this function is used to set the stock status and to save the stock data in the storage
  // if the status is true we 'reattach' the change detection that would be otherwise 'detach' 
  toggle(): void {
    this.data.status = !this.data.status;
    localStorage.setItem(this.data.symbol, JSON.stringify(this.data));

    this.cdr.detectChanges();

    if (this.data.status) {
      this.cdr.reattach();
      console.log('reattach cdr');
    } else {
      this.cdr.detach();
      console.log('detach cdr');
    }
  }

}
