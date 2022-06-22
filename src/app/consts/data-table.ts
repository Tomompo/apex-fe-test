// creates 100,000 rows
export const ngxRows = Array.from({length: 100000}).map((_, i) => ({ name: 'Molly', gender: 'Female', company: 'Burger King', test: 'APEX' }));

export const ngxColumns = [
  { prop: 'name' },
  { name: 'Gender' },
  { name: 'Company' },
  { name: 'test' },
];
