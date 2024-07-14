import Button from '../button/Button';
import { Trash2 as Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { formatCurrency } from '../../utils/currency';
import type { Dependent, Employee } from '../../types';
import { calculateBenefitCost } from '../../utils/benefits';

interface EmployeeFormProps {
  employee?: Employee | null;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSubmit, onCancel }) => {
  const [name, setName] = useState(employee ? employee.name : '');
  const [dependents, setDependents] = useState<Dependent[]>(employee ? employee.dependents : [{ name: '' }]);
  const [benefitCost, setBenefitCost] = useState(0);

  const [shouldFocusNew, setShouldFocusNew] = useState(false);
  const newDependentRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const cost = calculateBenefitCost(
      name,
      dependents.filter((dependent) => dependent.name),
    );
    setBenefitCost(cost);
  }, [name, dependents]);

  const isAddMoreDisabled = dependents.some((dependent) => dependent.name.trim() === '');

  const handleRemoveDependent = (index: number) => {
    const newDependents = [...dependents];
    newDependents.splice(index, 1);
    setDependents(newDependents);
  };

  useEffect(() => {
    if (shouldFocusNew && newDependentRef.current) {
      newDependentRef.current.scrollIntoView({ behavior: 'smooth' });
      newDependentRef.current.focus();
      setShouldFocusNew(false);
    }
  }, [dependents, shouldFocusNew]);

  const handleAddDependent = () => {
    const newDependent = { name: '' };
    setDependents([...dependents, newDependent]);
    setShouldFocusNew(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center w-full h-full items-center">
      <h2>{employee ? 'Edit employee' : 'Add new employee'}</h2>
      <div className="py-4 w-full h-full min-h-72 max-h-[calc(100vh-30rem)] overflow-y-auto">
        <div className="flex flex-col gap-1">
          <label htmlFor="employee">Employee name:</label>
          <input
            type="text"
            id="employee"
            name="employee"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 w-full border rounded-lg"
            placeholder="Enter employee name.."
          />
        </div>
        <div className="flex flex-col w-full gap-2 mt-3">
          <h3>Dependents:</h3>
          {dependents.map((dependent, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className="flex items-center gap-2">
                <span>{index + 1}. </span>
                <input
                  type="text"
                  name={`dependents[]`}
                  value={dependent.name}
                  onChange={(e) => {
                    const newDependents = [...dependents];
                    newDependents[index].name = e.target.value;
                    setDependents(newDependents);
                  }}
                  ref={index === dependents.length - 1 ? newDependentRef : null}
                  className="p-2 w-full border rounded-lg"
                  placeholder="Dependent Name"
                />
                <Button type="button" color="red" variant="secondary" onClick={() => handleRemoveDependent(index)}>
                  <Trash />
                </Button>
              </label>
            </div>
          ))}
          <Button type="button" className="w-fit border rounded-lg py-2 px-4" onClick={handleAddDependent} disabled={isAddMoreDisabled}>
            Add more...
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 mt-5">
        <div>Benefit cost per paycheck: {formatCurrency(benefitCost)}</div>
        <Button className="py-2">{employee ? 'Update' : 'create'}</Button>
        <Button type="button" className="py-2" variant="secondary" onClick={onCancel}>
          cancel
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
