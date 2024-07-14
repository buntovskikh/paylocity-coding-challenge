import { Dependent } from '../types';
import {
  NAME_DISCOUNT_PERCENTAGE,
  NUMBER_OF_PAYCHECKS_PER_YEAR,
  EMPLOYEE_BENEFIT_COST_PER_YEAR,
  DEPENDENT_BENEFIT_COST_PER_YEAR,
} from '../constants';

const DISCOUNT_MULTIPLIER = 1 - NAME_DISCOUNT_PERCENTAGE / 100;

const isDiscount = (name: string) => {
  return name.toLowerCase().startsWith('a');
};

const calculateItemCost = (cost: number, isDiscount: boolean): number => {
  return isDiscount ? DISCOUNT_MULTIPLIER * cost : cost;
};

export const calculateBenefitCost = (name: string, dependents: Dependent[]) => {
  const employeeCost = calculateItemCost(EMPLOYEE_BENEFIT_COST_PER_YEAR, isDiscount(name));
  const dependentsCost = dependents.reduce((total, { name }) => {
    return total + calculateItemCost(DEPENDENT_BENEFIT_COST_PER_YEAR, isDiscount(name));
  }, 0);

  return (employeeCost + dependentsCost) / NUMBER_OF_PAYCHECKS_PER_YEAR;
};
