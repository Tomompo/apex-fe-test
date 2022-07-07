export interface IApexRow {
  name: string;
  // gender: string;
  email: string;
  age: number;
  regAge: number;
}

export interface IColumnDef {
  prop: string;
  name: string;
  type?: string;
  width: number;
}

export enum InputType {
  text = 'text',
  number = 'number',
}

export interface IPerson {
  dob: {
    age: number;
  },
  location: {
    street: {
      number: number;
    },
    postcode: number;
  }
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
  },
  registered: {
    age: number;
  }
}
