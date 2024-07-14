import React, { useState } from 'react';
import EmployeeTable from './components/employees/EmployeesTable';
import EmployeeForm from './components/employees/EmployeeForm';
import Modal from './components/modal/Modal';
import Button from './components/button/Button';
import type { Dependent, Employee } from './types';
import { useCreateEmployeeAction, useDeleteEmployeeAction, useEmployeesAction, useUpdateEmployeeAction } from './state/actions';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const { isLoading } = useEmployeesAction(setEmployees);
  const { create } = useCreateEmployeeAction(setEmployees);
  const { update } = useUpdateEmployeeAction(setEmployees);
  const { remove } = useDeleteEmployeeAction(setEmployees);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('employee') as string;
    const dependents = formData.getAll('dependents[]').map((name) => ({ name })) as Dependent[];

    if (editingEmployee) {
      update({ id: editingEmployee.id, name, dependents });
    } else {
      create({ name, dependents });
    }

    setEditingEmployee(null); // reset employee select
    setIsOpen(false);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsOpen(true);
  };

  const handleDelete = (employeeId: string) => {
    remove({ id: employeeId });
  };

  const handleClose = () => {
    setEditingEmployee(null); // reset employee select
    setIsOpen(false);
  };

  return (
    <div className="p-6 w-screen h-screen flex flex-col gap-2  items-center">
      <div className="flex w-full justify-center mb-4 items-center">
        <h1 className="font-bold">Healthcare Benefits Management</h1>
      </div>
      <div className="ml-auto">
        <Button type="button" className="py-2 px-4" onClick={() => setIsOpen(true)}>
          Add employee
        </Button>
      </div>
      {isLoading ? <div>loading</div> : <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <EmployeeForm employee={editingEmployee} onCancel={handleClose} onSubmit={handleSave} />
      </Modal>
    </div>
  );
};

export default App;
