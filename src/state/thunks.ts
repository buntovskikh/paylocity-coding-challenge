import { Employee } from '../types';
import { initialData } from './mockData';

// LOCAL STORAGE AS DATABASE
const loadLocalStorage = () => {
  const savedEmployees = localStorage.getItem('employees');
  return savedEmployees ? JSON.parse(savedEmployees) : initialData;
};

const createLocalStorage = (employee: Employee) => {
  const employees = loadLocalStorage();
  localStorage.setItem('employees', JSON.stringify([...employees, employee]));
};

export const updateLocalStorage = (updatedEmployee: Employee) => {
  const employees = loadLocalStorage();
  const index = employees.findIndex((emp: Employee) => emp.id === updatedEmployee.id);
  if (index !== -1) {
    employees[index] = updatedEmployee;
    localStorage.setItem('employees', JSON.stringify(employees));
  }
};

const deleteFromLocalStorage = (employeeId: Employee['id']) => {
  const employees = loadLocalStorage();

  localStorage.setItem('employees', JSON.stringify(employees.filter((emp: Employee) => emp.id !== employeeId)));
};

// MOCK FETCH REQUESTS WITH 300ms DELAY
export const getEmployees = (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(loadLocalStorage());
    }, 300);
  });
};

export const createEmployee = (requestData: Omit<Employee, 'id'>): Promise<Employee> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEmployee = { id: crypto.randomUUID(), ...requestData };
      createLocalStorage(newEmployee);
      resolve(newEmployee);
    }, 300);
  });
};

export const updateEmployee = (requestData: Employee): Promise<Employee> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      updateLocalStorage(requestData);
      resolve(requestData);
    }, 300);
  });
};

export const deleteEmployee = (requestData: { id: Employee['id'] }): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      deleteFromLocalStorage(requestData.id);
      resolve();
    }, 300);
  });
};
