// creates 100,000 rows
import {IColumnDef, InputType} from "../interfaces/chart";

export const ngxRows = Array.from({length: 100000}).map((_, i) => ({ name: 'Molly', gender: 'Female', company: 'Burger King', test: 'APEX' }));

export const ngxColumns = [
  { prop: 'name' },
  { name: 'Gender' },
  { name: 'Company' },
  { name: 'test' },
];

export const personColumns: IColumnDef[] = [
  { prop: 'name', name: 'Name', type: InputType.text, width: 10, colour: undefined },
  { prop: 'email', name: 'Email', type: InputType.text, width: 300, colour: undefined },
  { prop: 'age', name: 'Age', type: InputType.number, width: 10, colour: undefined },
  { prop: 'regAge', name: 'Registered age', type: InputType.number, width: 10, colour: undefined },
  { prop: 'postcode', name: 'Postcode', type: InputType.number, width: 10, colour: undefined },
  { prop: 'houseNo', name: 'House No', type: InputType.number, width: 10, colour: undefined },
]
