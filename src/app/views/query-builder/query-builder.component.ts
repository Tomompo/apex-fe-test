import { Component, OnInit } from '@angular/core';
import {Form, FormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {dataPointFilter} from "./data-point-filter";

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {

  dpf = dataPointFilter;

  form: UntypedFormGroup = new UntypedFormGroup({});

  constructor() { }

  ngOnInit(): void {

    this.form.addControl('data-points', new UntypedFormGroup({}));

    const dataPoints = this.form.get('data-points') as UntypedFormGroup;

    Object.keys(this.dpf["data-points"])
      .forEach(key => {
        console.log(key);



        // @ts-ignore
        const controls = this.dpf["data-points"][key].map((options: {id: string, label: string}) =>
          dataPoints.addControl(options.label, new UntypedFormControl(false))
        );

        dataPoints.addControl(key, new UntypedFormGroup({}));

      });

    console.log(this.form.value);
  }

}
