import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup, NgForm,
  Validators
} from "@angular/forms";
import {dataPointFilter} from "./data-point-filter";
import {DataService, RepoItem} from "./data-service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {

  dpf = dataPointFilter;

  autocomplete$: Map<string, Observable<RepoItem[]>> = new Map();

  form: FormGroup = new FormGroup<any>({
    name: new FormControl('new query'),
    type: new FormControl('table'),
    data_points: new FormGroup({}),
    filters : new FormGroup({
      time_period: new FormGroup({
        type: new FormControl(null),
        relative_months: new FormControl(null),
        specific: new FormGroup({

          type: new FormControl(null),

          year_from: new FormControl(null),
          year_to: new FormControl(null),

          quarters: new FormGroup({
            one: new FormControl(false),
            two: new FormControl(false),
            three: new FormControl(false),
            four: new FormControl(false),
          }),
          months: new FormGroup({
            from: new FormControl(null),
            to: new FormControl(null),
          }),
          seasons: new FormControl(null),

        })
      }),
    }),
    groupings : new FormGroup({
      gov_taxes: new FormControl(true),
    }),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

      this.dpf.data_points
        .forEach(key => {
          const group = new FormGroup({});

          // @ts-ignore
          key.data.forEach((options: {id: string, label: string, code: string }) =>
            group.addControl(options.code, new FormControl<boolean>(false))
          );

          (this.form.get('data_points') as FormGroup).addControl(key.code, group);
        });



      this.dpf.filters
        .forEach(filter => {

          const control = (this.form.get('filters') as FormGroup);

          switch (filter.code) {
            // in case we have more types in future with bespoke choices
            case 'cabin_type':
              control.addControl('cabin_type', new FormControl(null));
            break;

            default: {
              const group = new FormGroup({
                type: new FormControl(null),
                selected: new FormArray([]),
              });

              control.addControl(filter.code, group);

              this.autocomplete$.set(filter.code, new BehaviorSubject([]));

              break;
            }

          }

        });

    //  dynamic form groupings/summaries
    // this.form.get('data_points')?.valueChanges.subscribe(() => {
    //
    //   const updatedGroup = new FormGroup({});
    //
    //   this.dpf.groupings.forEach(group => {
    //
    //     group.data.applicable_to_filters.forEach((filter) => {
    //
    //       if (!!this.form.get(filter)?.value) {
    //         const previousValue = (this.form.get('groupings') as FormGroup).get(group.code)?.value;
    //
    //         updatedGroup.addControl(group.code, new FormControl(previousValue));
    //       }
    //
    //     });
    //
    //   });
    //
    //   this.form.setControl('groupings', updatedGroup);
    //
    //   return;
    //
    // });


    this.dpf.groupings.forEach(group => {
      (this.form.get('groupings') as FormGroup).addControl(group.code, new FormControl(null));
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onSelect(filter: string, code: RepoItem) {
    const a = (this.form.get(`filters.${filter}.selected`) as FormArray);

    a.push(new FormControl(code));
  }

  isControllable(control: string): boolean {
    return !!(this.form.get(`groupings.${control}`) as AbstractControl);
  }

  getFilterArray(filter: string) {
      return (this.form.get(`filters.${filter}.selected`) as FormArray).controls;
  }

  remFilterArray(filter: string, i: number) {
    (this.form.get(`filters.${filter}.selected`) as FormArray).removeAt(i);
  }

  onChange(filter: string, type: string, term: string) {
    this.autocomplete$.set(filter, this.dataService.search(filter, type, term));
  }

  clear(filter: string, form: NgForm) {
    setTimeout(() => {
      this.autocomplete$.set(filter, new BehaviorSubject([]));
    }, 100);

    form.reset();
  }

  save(): void {
    localStorage.setItem('saved-form', JSON.stringify(this.form.value));

    console.log('saved: ', this.form.value);
  }

  load(): void {
    const patch = JSON.parse(localStorage.getItem('saved-form') || "{}");

    this.form.patchValue(patch);

    (Object.keys(patch.filters) || []).forEach((filter) => {

      (patch.filters[filter]?.selected || []).forEach((opt: RepoItem) => {
        (this.form.get(`filters.${filter}.selected`) as FormArray).push(new FormControl(opt));
      });

    });

    console.log('loaded: ', patch);
  }

  clearOpts(filter: string) {
    (this.form.get(`filters.${filter}.selected`) as FormArray).clear();
  }

  checkMe(): void {
    console.log('check me');
  }
}
