import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormControl, FormGroup} from "@angular/forms";
import {dataPointFilter} from "./data-point-filter";

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {

  dpf = dataPointFilter;

  form: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {

    this.form.addControl('data-points', new FormGroup({}));

    const dataPoints = this.form.get('data-points') as FormGroup;

    Object.keys(this.dpf["data-points"])
      .forEach(key => {
        console.log(key);



        // @ts-ignore
        const controls = this.dpf["data-points"][key].map((options: {id: string, label: string}) =>
          dataPoints.addControl(options.label, new FormControl(false))
        );

        dataPoints.addControl(key, new FormGroup({}));

      });

    console.log(this.form.value);
  }

}
