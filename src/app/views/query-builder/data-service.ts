import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

export interface RepoItem {
  id: string, code: string, label: string,
}

@Injectable({ providedIn: 'root'})
export class DataService {

  constructor() {
  }

  search(filter: string, type: string, term: string): Observable<RepoItem[]> {

    return new Observable<RepoItem[]>((observer) => {

      setTimeout(() => {

        switch (filter) {

          case 'origin' :
          case 'destination': {

            observer.next([
              {id: '1', code: 'stuttgart', label: 'Stuttgart', type: 'city'},
              {id: '1', code: 'brum', label: 'Birmingham', type: 'city'},
              {id: '2', code: 'DE', label: 'germany', type: 'Germany'},
              {id: '2', code: 'ENG', label: 'england', type: 'England'},
              {id: '3', code: 'STR', label: 'Stuttgart Airport', type: 'airport'},
              {id: '3', code: 'BHX', label: 'Birmingham Airport', type: 'airport'},
            ].filter(opt => {
              return (opt.label.toLowerCase()).includes(term) && opt.type === type;
            }));
            observer.complete();

            break;
          }
          case 'airline' : {

            observer.next([
              { id: '1', code: 'FR', label: 'Ryanair', type: '' },
              { id: '2', code: 'BA', label: 'British Airways', type: '' },
              { id: '3', code: 'EJ', label: 'Easyjet', type: '' },
            ].filter(opt => {
              return (opt.label.toLowerCase()).includes(term);
            }));
            observer.complete();

            break;
          }
          case 'aircraft' : {

            observer.next([
              { id: '1', code: 'B', label: 'Boeing 747', type: '' },
              { id: '2', code: 'C', label: 'Boeing 757', type: '' },
              { id: '3', code: 'D', label: 'Boeing 777', type: '' },
            ].filter(opt => {
              return (opt.label.toLowerCase()).includes(term);
            }));
            observer.complete();

            break;
          }

        }

      }, 250);


    });

  }

}
