import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCardComponent } from './stock-card.component';
import { CommonModule } from '@angular/common';

describe('StockCardComponent', () => {
  let component: StockCardComponent;
  let fixture: ComponentFixture<StockCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, StockCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCardComponent);
    component = fixture.componentInstance;
    component.data = {
      status: true,
      ask: 100,
      askSize: 100,
      averageDailyVolume3Month: 100,
      averageDailyVolume10Day: 100,
      beta: 100,
      bid: 100,
      bidSize: 100,
      bookValue: 100,
      components: [],
      currency: "USD",
      dividendsPerShare: 100,
      earningsTimestamp: 100,
      earningsTimestampEnd: 100,
      earningsTimestampStart: 100,
      ebitda: 100,
      epsCurrentYear: 100,
      epsForward: 100,
      epsNextQuarter: 100,
      epsTrailingTwelveMonths: 100,
      esgPopulated: true,
      exchange: "USD",
      exchangeDataDelayedBy: 100,
      exchangeTimezoneName: "USD",
      exchangeTimezoneShortName: "USD",
      fiftyDayAverage: 100,
      fiftyDayAverageChange: 100,
      fiftyDayAverageChangePercent: 100,
      fiftyTwoWeekHigh: 100,
      fiftyTwoWeekHighChange: 100,
      fiftyTwoWeekHighChangePercent: 100,
      fiftyTwoWeekLow: 100,
      fiftyTwoWeekLowChange: 100,
      fiftyTwoWeekLowChangePercent: 100,
      fiftyTwoWeekRange: "USD",
      firstTradeDateMilliseconds: 100,
      floatShares: 100,
      forwardPE: 100,
      fullExchangeName: "USD",
      gmtOffSetMilliseconds: 100,
      heldPercentInsiders: 100,
      heldPercentInstitutions: 100,
      language: "USD",
      longName: "USD",
      market: "USD",
      marketCap: 100,
      marketState: "USD",
      messageBoardId: "USD",
      pageViews: {
        midTermTrend: "USD",
        ongTermTrend: "USD",
        shortTermTrend: "USD",
      },
      pegRatio: 100,
      postMarketChange: 100,
      postMarketChangePercent: 100,
      postMarketPrice: 100,
      postMarketTime: 100,
      priceEpsCurrentYear: 100,
      priceEpsNextQuarter: 100,
      priceHint: 100,
      priceToBook: 100,
      priceToSales: 100,
      quoteSourceName: "USD",
      quoteType: "USD",
      region: "USD",
      regularMarketChange: 100,
      regularMarketChangePercent: 100,
      regularMarketDayHigh: 100,
      regularMarketDayLow: 100,
      regularMarketDayRange: 100,
      regularMarketOpen: 100,
      regularMarketPreviousClose: 100,
      regularMarketPrice: 100,
      regularMarketTime: 100,
      regularMarketVolume: 100,
      revenue: 100,
      sharesOutstanding: 100,
      sharesShort: 100,
      sharesShortPrevMonth: 100,
      shortName: "USD",
      shortPercentFloat: 100,
      shortRatio: 100,
      sourceInterval: 100,
      symbol: "USD",
      targetPriceHigh: 100,
      targetPriceLow: 100,
      targetPriceMean: 100,
      targetPriceMedian: 100,
      totalCash: 100,
      tradeable: true,
      trailingPE: 100,
      triggerable: true,
      twoHundredDayAverage: 100,
      twoHundredDayAverageChange: 100,
      twoHundredDayAverageChangePercent: 100,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
