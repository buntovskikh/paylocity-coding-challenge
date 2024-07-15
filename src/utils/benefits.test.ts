import { Dependent } from '../types';

import {
  EMPLOYEE_BENEFIT_COST_PER_YEAR,
  DEPENDENT_BENEFIT_COST_PER_YEAR,
  NUMBER_OF_PAYCHECKS_PER_YEAR,
  NAME_DISCOUNT_PERCENTAGE,
} from '../constants';

import { calculateBenefitCost } from './benefits';

const DISCOUNT_MULTIPLIER = 1 - NAME_DISCOUNT_PERCENTAGE / 100;

describe('calculateBenefitCost', () => {
  it('should calculate the correct benefit cost for an employee without dependents and no discount', () => {
    const name = 'Bob';
    const dependents: Dependent[] = [];

    const expectedCost = EMPLOYEE_BENEFIT_COST_PER_YEAR / NUMBER_OF_PAYCHECKS_PER_YEAR;
    const result = calculateBenefitCost(name, dependents);

    expect(result).toBeCloseTo(expectedCost);
  });

  it('should calculate the correct benefit cost for an employee with a discount and no dependents', () => {
    const name = 'Alice';
    const dependents: Dependent[] = [];

    const expectedCost = (EMPLOYEE_BENEFIT_COST_PER_YEAR * DISCOUNT_MULTIPLIER) / NUMBER_OF_PAYCHECKS_PER_YEAR;
    const result = calculateBenefitCost(name, dependents);

    expect(result).toBeCloseTo(expectedCost);
  });

  it('should calculate the correct benefit cost for an employee with dependents and no discount', () => {
    const name = 'Bob';
    const dependents: Dependent[] = [{ name: 'Charlie' }, { name: 'David' }];

    const expectedCost =
      (EMPLOYEE_BENEFIT_COST_PER_YEAR + DEPENDENT_BENEFIT_COST_PER_YEAR * dependents.length) / NUMBER_OF_PAYCHECKS_PER_YEAR;
    const result = calculateBenefitCost(name, dependents);

    expect(result).toBeCloseTo(expectedCost);
  });

  it('should calculate the correct benefit cost for an employee with dependents and discounts', () => {
    const name = 'Alice';
    const dependents: Dependent[] = [{ name: 'Anna' }, { name: 'David' }];

    const expectedCost =
      (EMPLOYEE_BENEFIT_COST_PER_YEAR * DISCOUNT_MULTIPLIER +
        DEPENDENT_BENEFIT_COST_PER_YEAR * DISCOUNT_MULTIPLIER +
        DEPENDENT_BENEFIT_COST_PER_YEAR) /
      NUMBER_OF_PAYCHECKS_PER_YEAR;
    const result = calculateBenefitCost(name, dependents);

    expect(result).toBeCloseTo(expectedCost);
  });
});
