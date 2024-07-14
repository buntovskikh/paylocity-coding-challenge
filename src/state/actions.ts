import { Employee } from '../types';
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from './thunks';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

type EmployeeSetter = Dispatch<SetStateAction<Employee[]>>;

export const useEmployeesAction = (setEmployees: EmployeeSetter) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .finally(() => setIsLoading(false));
  }, [setEmployees]);

  return { isLoading };
};

export const useCreateEmployeeAction = (setEmployees: EmployeeSetter) => {
  const [isLoading, setIsLoading] = useState(false);

  const create = (actionData: Omit<Employee, 'id'>) => {
    setIsLoading(true);
    createEmployee(actionData)
      .then((data) => {
        setEmployees((prev) => [...prev, data]);
      })
      .finally(() => setIsLoading(false));
  };
  return { isLoading, create };
};

export const useUpdateEmployeeAction = (setEmployees: EmployeeSetter) => {
  const [isLoading, setIsLoading] = useState(false);

  const update = (actionData: Employee) => {
    setIsLoading(true);
    updateEmployee(actionData)
      .then(() => {
        setEmployees((prev) => {
          const state = [...prev];
          const index = state.findIndex((employee: Employee) => employee.id === actionData.id);

          if (index !== -1) {
            state[index] = actionData;
          }
          return state;
        });
      })
      .finally(() => setIsLoading(false));
  };
  return { isLoading, update };
};

export const useDeleteEmployeeAction = (setEmployees: EmployeeSetter) => {
  const [isLoading, setIsLoading] = useState(false);

  const remove = (actionData: Pick<Employee, 'id'>) => {
    setIsLoading(true);
    deleteEmployee(actionData)
      .then(() => {
        setEmployees((prev) => {
          return prev.filter((employee: Employee) => employee.id !== actionData.id);
        });
      })
      .finally(() => setIsLoading(false));
  };
  return { isLoading, remove };
};
