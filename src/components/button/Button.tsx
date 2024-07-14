import React from 'react';
import { cn } from '../../utils/cn';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  color?: 'blue' | 'red';
};

const Button: React.FC<Props> = ({ className, variant = 'primary', color = 'blue', ...rest }) => {
  return (
    <button
      className={cn(
        'px-2 py-1 border rounded-lg uppercase',
        { 'bg-red-500 text-white hover:bg-red-700': color === 'red' && variant === 'primary' },
        { 'bg-blue-500 text-white hover:bg-blue-700': color === 'blue' && variant === 'primary' },
        { 'border-red-500 text-red-500 hover:bg-red-100': color === 'red' && variant === 'secondary' },
        { 'border-blue-500 text-blue-500 hover:bg-blue-100': color === 'blue' && variant === 'secondary' },
        className,
      )}
      {...rest}
    />
  );
};

export default Button;
