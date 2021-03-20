import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll, delayWhen, retryWhen } from 'rxjs/operators';
import { Observable, Subject, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
export const WS_ENDPOINT = environment.ws;
export const RECONNECT_INTERVAL = 5000;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private socket$: WebSocketSubject<any> | undefined;
  private requestSubject$ = new Subject<any>();
  public requests$: Observable<any> = this.requestSubject$.pipe(
    switchAll(),
    catchError(e => { throw e })
  );

  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
 
    // we check if the websocket subject is not closed or if it's undefined
    // if undefined or close we then create the real websocket connection
    // the 'reconnect' flag is used to attempt a reconnection to the server in case there's a server side disconnection
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();

      const requests = this.socket$.pipe(cfg.reconnect ? this.reconnect : (o: any) => o,
        tap({
          error: error => console.log(error),
        }),
        catchError(_ => console.log)
      );

      this.requestSubject$.next(requests);
      
    }

  }

  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      retryWhen(errors => errors.pipe(
        tap(val => console.log('WS Try to reconnect', val)), 
        delayWhen(_ => timer(RECONNECT_INTERVAL))),
      )
    );
  }

  close(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = undefined;
    }
  }

  sendRequest(msg: any): void {
    if (this.socket$) {
      this.socket$.next(msg);
   }
  }
  
  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: WS_ENDPOINT,
      protocol: 'api',
      openObserver: {
        next: () => {
          console.log('WS connection ok');
        }
      },
      closeObserver: {
        next: () => {
          console.log('WS connection closed');
          this.socket$ = undefined;
          this.connect({ reconnect: true });
        }
      },
    });
  }
    
}
