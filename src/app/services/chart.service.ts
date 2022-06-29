import {Injectable} from "@angular/core";
import {IApexRow, IColumnDef, InputType, IPerson} from "../interfaces/chart";
import {HttpClient} from "@angular/common/http";
import {map, Observable, take} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ChartService {

  constructor(private httpClient: HttpClient) {
  }

  getData(page: number): Observable<IApexRow[]> {
    return this.httpClient.get<{ results: IPerson[] }>(`https://randomuser.me/api/?page=${ page + 1 }&results=15&seed=abc`)
      .pipe(
        take(1),
        map(({ results }) => results.map((result) => ({
          name: result.name.first,
          email: result.email,
          age: result.dob.age,
          regAge: result.registered.age,
          postcode: Math.floor(result.location.postcode / 1000) || 0,
          houseNo: Math.floor(result.location.street.number / 120) || 0,
        }))),
      );
  }

  // highcharts cannot handle strings for numbers etc, the types need to be cast correctly for the cell.
  static typeCast(column: IColumnDef, value: string): string | number {
    switch (column.type) {
      case InputType.number:
        return Number(value);
        break;
      default:
        return value;
        break;
    }
  }

  static genSeriesByType(columns: IColumnDef[], rows: IApexRow[], chartType: string): { categories: string[], series: any[] } {
    let categories: string[];
    let series: any[];

    // ignore string columns as they do not work with PIE
    const stringColumns: string[] = columns.flatMap((col) => {
      // @ts-ignore
      if (typeof rows[0][col.prop] === 'string') {
        return [col.prop];
      }
      return [];
    });

    switch (chartType) {
      case 'pie':
        // for each of the columns, make a pie series
        series = columns.flatMap((col) => {

          return stringColumns.includes(col.prop) ? [] : {
            name: col.name,
            data: rows.map((row: any) => ({
              name: row[stringColumns[0]],
              y: row[col.prop],
            })),
          };
        });

        return { categories: [], series };
        break;

      default:
        // @ts-ignore
        categories = rows.map((row) => row[stringColumns[0]]);

        // for each of the columns, make a series, and provide all rows data for this column
        series = columns.flatMap((col) => {

          return stringColumns.includes(col.prop) ? [] : {
            name: col.name,
            data: rows.map((row: any) => row[col.prop]),
          };

        });

        return { categories, series };
        break;
    }
  }

}
