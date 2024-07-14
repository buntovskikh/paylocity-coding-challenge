export type Dependent = {
  name: string;
};

export type Employee = {
  id: string;
  name: string;
  dependents: Dependent[];
};
