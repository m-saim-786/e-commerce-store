import {
  InputHTMLAttributes,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  ChangeEvent,
} from 'react';

import { Input } from './input';

export type DebouncedInputProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  ({ value: initialValue, onChange, debounce = 200, ...props }, ref) => {
    const [value, setValue] = useState<string | number>(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!, []);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue =
        event.target.type === 'number'
          ? event.target.valueAsNumber
          : event.target.value;

      setValue(newValue);
    };

    return (
      <Input
        {...props}
        ref={inputRef}
        value={value ?? ''}
        onChange={handleInputChange}
      />
    );
  },
);

DebouncedInput.displayName = 'DebouncedInput';