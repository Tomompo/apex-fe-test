// creates 100,000 rows
import {InputType} from "../interfaces/chart";

export const ngxRows = Array.from({length: 100000}).map((_, i) => ({ name: 'Molly', gender: 'Female', company: 'Burger King', test: 'APEX' }));

export const ngxColumns = [
  { prop: 'name' },
  { name: 'Gender' },
  { name: 'Company' },
  { name: 'test' },
];

export const personColumns = [
  { prop: 'name', name: 'Name', type: InputType.text, },
  { prop: 'email', name: 'Email', type: InputType.text, },
  { prop: 'age', name: 'Age', type: InputType.number, },
  { prop: 'regAge', name: 'Registered age', type: InputType.number, },
  { prop: 'postcode', name: 'Postcode', type: InputType.number, },
  { prop: 'houseNo', name: 'House No', type: InputType.number, },
]
