import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of, Subject, take } from "rxjs";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

export interface DrillDownResponse<T> {
  type: string;
  child: string;
  data: T[],
}

@Injectable({ providedIn : 'root' })
export class DrillDownService {

  constructor(private http: HttpClient) {
  }

  get(path = 'destinations', parentId?: string): Observable<DrillDownResponse<any>> {

    const resp: Subject<any> = new Subject<any>();

    // spoof a small delay
    setTimeout(() => {
      this.http.get<any>(`/assets/${path}.json`)
        .pipe(
          take(1),
          map((records: DrillDownResponse<any>) => {

            records.data = records.data.map((r) => ({
              ...r,
              id: uuidv4().substring(0,7), // fake the unique id's of a DB
              treeStatus: (!!r.flights && !!records.child) ? 'collapsed' : 'disabled',
              parentId,
            }));

            return records;

          }),
          catchError((e) => {
            alert(`Bad request: ${ e.status }`);

            return of({ data: [] });
          }),
        )
        .subscribe((r) => resp.next(r));
    }, 500);

    return resp;
  }

}
