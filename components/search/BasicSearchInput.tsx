import React, { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';

interface BasicSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const BasicSearchInput: React.FC<BasicSearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={className}
    />
  );
};

export default BasicSearchInput;
