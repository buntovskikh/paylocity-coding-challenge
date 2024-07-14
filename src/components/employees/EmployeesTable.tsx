import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table/Table';
import { Edit, Trash2 as Trash } from 'lucide-react';
import Button from '../button/Button';

import { calculateBenefitCost } from '../../utils/benefits';
import { Employee } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: Employee['id']) => void;
}

const EmployeeTable: React.FC<Props> = ({ onEdit, onDelete, employees }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow header>
          <TableHead>Employee Name</TableHead>
          <TableHead>Dependents</TableHead>
          <TableHead>Cost per Paycheck</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.dependents.map((dependent) => dependent.name).join(', ')}</TableCell>
            <TableCell>{formatCurrency(calculateBenefitCost(employee.name, employee.dependents))}</TableCell>
            <TableCell>
              <div className="flex gap-2 w-fit ml-auto">
                <Button type="button" variant="secondary" onClick={() => onEdit(employee)}>
                  <Edit />
                </Button>
                <Button type="button" variant="secondary" color="red" onClick={() => onDelete(employee.id)}>
                  <Trash />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
