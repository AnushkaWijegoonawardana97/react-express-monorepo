import type { FormFieldProps } from './FormField.types';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';

export const FormField = ({
  label,
  error,
  required = false,
  helperText,
  fullWidth = true,
  id,
  ...inputProps
}: FormFieldProps) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <Label htmlFor={inputId} required={required}>
        {label}
      </Label>
      <Input
        id={inputId}
        error={error}
        fullWidth={fullWidth}
        {...inputProps}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
